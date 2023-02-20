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
import { TrackService } from './track.service';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ExceptionMessages } from '../constants/exceptionMessages';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from '../albums/album.service';
import { FavoriteService } from '../favorites/favorite.service';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get()
  getTracks(): TrackEntity[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param() params: IdParamsDto): TrackEntity {
    const track = this.trackService.getTrackById(params.id);
    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  @Post()
  createTrack(@Body() body: CreateTrackDto): TrackEntity {
    if (body.artistId) {
      const targetArtistId = this.artistService.getArtistById(body.artistId);

      if (!targetArtistId) {
        throw new BadRequestException(ExceptionMessages.ARTIST_NOT_FOUND);
      }
    }

    if (body.albumId) {
      const targetAlbumId = this.albumService.getAlbumById(body.albumId);

      if (!targetAlbumId) {
        throw new BadRequestException(ExceptionMessages.ALBUM_NOT_FOUND);
      }
    }

    return this.trackService.createTrack(body);
  }

  @Put(':id')
  updateTrack(
    @Param() params: IdParamsDto,
    @Body() body: UpdateTrackDto,
  ): TrackEntity {
    if (body.artistId) {
      const targetArtistId = this.artistService.getArtistById(body.artistId);

      if (!targetArtistId) {
        throw new BadRequestException(ExceptionMessages.ARTIST_NOT_FOUND);
      }
    }

    if (body.albumId) {
      const targetAlbumId = this.albumService.getAlbumById(body.albumId);

      if (!targetAlbumId) {
        throw new BadRequestException(ExceptionMessages.ALBUM_NOT_FOUND);
      }
    }

    return this.trackService.updateTrack(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() params: IdParamsDto): Record<string, never> {
    const deletedTrack = this.trackService.deleteTrack(params.id);

    const { tracks } = this.favoriteService.getFavorites();

    if (tracks.includes(deletedTrack.id)) {
      this.favoriteService.deleteTrack(deletedTrack.id);
    }

    return {};
  }
}
