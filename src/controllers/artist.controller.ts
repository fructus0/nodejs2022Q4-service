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

import { ArtistService } from '../services/artist.service';
import { ArtistEntity } from '../entities/artist.entity';
import { IdParamsDto } from '../dto/id-params.dto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { TrackService } from '../services/track.service';
import { AlbumService } from '../services/album.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @Get('artist')
  getArtists(): ArtistEntity[] {
    return this.artistService.getArtists();
  }

  @Get('artist/:id')
  getArtistById(@Param() params: IdParamsDto): ArtistEntity {
    const artist = this.artistService.getArtistById(params.id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  @Post('artist')
  createArtist(@Body() body: CreateArtistDto): ArtistEntity {
    return this.artistService.createArtist(body);
  }

  @Put('artist/:id')
  updateArtist(
    @Param() params: IdParamsDto,
    @Body() body: UpdateArtistDto,
  ): ArtistEntity {
    return this.artistService.updateArtist(params.id, body);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param() params: IdParamsDto): Record<string, never> {
    const deletedArtist = this.artistService.deleteArtist(params.id);

    this.trackService.formatTracksAfterArtistDeletion(deletedArtist.id);
    this.albumService.formatAlbumsAfterArtistDeletion(deletedArtist.id);

    return {};
  }
}
