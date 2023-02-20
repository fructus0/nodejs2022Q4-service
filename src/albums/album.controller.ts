import {
  BadRequestException,
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

import { IdParamsDto } from '../app/dto/id-params.dto';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { ArtistService } from '../artists/artist.service';
import { ExceptionMessages } from '../constants/exceptionMessages';
import { TrackService } from '../tracks/track.service';
import { FavoriteService } from '../favorites/favorite.service';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly favoriteService: FavoriteService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  getTracks(): AlbumEntity[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getTrackById(@Param() params: IdParamsDto): AlbumEntity {
    const album = this.albumService.getAlbumById(params.id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  @Post()
  createAlbum(@Body() body: CreateAlbumDto): AlbumEntity {
    if (body.artistId) {
      const targetArtistId = this.artistService.getArtistById(body.artistId);

      if (!targetArtistId) {
        throw new BadRequestException(ExceptionMessages.ARTIST_NOT_FOUND);
      }
    }

    return this.albumService.createAlbum(body);
  }

  @Put(':id')
  updateAlbum(
    @Param() params: IdParamsDto,
    @Body() body: UpdateAlbumDto,
  ): AlbumEntity {
    if (body.artistId) {
      const targetArtistId = this.artistService.getArtistById(body.artistId);

      if (!targetArtistId) {
        throw new BadRequestException(ExceptionMessages.ARTIST_NOT_FOUND);
      }
    }

    return this.albumService.updateAlbum(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param() params: IdParamsDto): Record<string, never> {
    const deletedAlbum = this.albumService.deleteAlbum(params.id);

    this.trackService.formatTracksAfterAlbumDeletion(deletedAlbum.id);

    const { albums } = this.favoriteService.getFavorites();

    if (albums.includes(deletedAlbum.id)) {
      this.favoriteService.deleteAlbum(deletedAlbum.id);
    }

    return {};
  }
}
