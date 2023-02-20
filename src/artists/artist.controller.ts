import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';
import { IdParamsDto } from '../app/dto/id-params.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from '../tracks/track.service';
import { AlbumService } from '../albums/album.service';
import { FavoriteService } from '../favorites/favorite.service';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get()
  getArtists(): ArtistEntity[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() params: IdParamsDto): ArtistEntity {
    const artist = this.artistService.getArtistById(params.id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  @Post()
  createArtist(@Body() body: CreateArtistDto): ArtistEntity {
    return this.artistService.createArtist(body);
  }

  @Put(':id')
  updateArtist(
    @Param() params: IdParamsDto,
    @Body() body: UpdateArtistDto,
  ): ArtistEntity {
    return this.artistService.updateArtist(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param() params: IdParamsDto): Record<string, never> {
    const deletedArtist = this.artistService.deleteArtist(params.id);

    this.trackService.formatTracksAfterArtistDeletion(deletedArtist.id);
    this.albumService.formatAlbumsAfterArtistDeletion(deletedArtist.id);

    const { artists } = this.favoriteService.getFavorites();

    if (artists.includes(deletedArtist.id)) {
      this.favoriteService.deleteArtist(deletedArtist.id);
    }

    return {};
  }
}
