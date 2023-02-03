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

import { IdParamsDto } from '../dto/id-params.dto';
import { TrackService } from '../services/track.service';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ExceptionMessages } from '../constants/exceptionMessages';
import { ArtistService } from '../services/artist.service';
import { AlbumService } from '../services/album.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  @Get('track')
  getTracks(): TrackEntity[] {
    return this.trackService.getTracks();
  }

  @Get('track/:id')
  getTrackById(@Param() params: IdParamsDto): TrackEntity {
    const track = this.trackService.getTrackById(params.id);
    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  @Post('track')
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

  @Put('track/:id')
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

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() params: IdParamsDto): Record<string, never> {
    this.trackService.deleteTrack(params.id);

    return {};
  }
}
