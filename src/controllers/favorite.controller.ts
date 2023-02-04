import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { TrackService } from '../services/track.service';
import { AlbumService } from '../services/album.service';
import { FavoriteService } from '../services/favorite.service';
import { IdParamsDto } from '../dto/id-params.dto';
import { ExceptionMessages } from '../constants/exceptionMessages';
import { ArtistEntity } from '../entities/artist.entity';
import { AlbumEntity } from '../entities/album.entity';
import { TrackEntity } from '../entities/track.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class FavoriteController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get('favs')
  getFavorites(): {
    artists: ArtistEntity[];
    albums: AlbumEntity[];
    tracks: TrackEntity[];
  } {
    const { albums, artists, tracks } = this.favoriteService.getFavorites();

    return {
      artists: this.artistService
        .getArtists()
        .filter((artist) => artists.includes(artist.id)),
      albums: this.albumService
        .getAlbums()
        .filter((album) => albums.includes(album.id)),
      tracks: this.trackService
        .getTracks()
        .filter((track) => tracks.includes(track.id)),
    };
  }

  @Post('favs/track/:id')
  addTrack(@Param() params: IdParamsDto): { message: string } {
    const track = this.trackService.getTrackById(params.id);

    if (!track) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.addTrack(params.id);

    return {
      message: 'Track added successfully',
    };
  }

  @Delete('favs/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() params: IdParamsDto): { message: string } {
    const track = this.trackService.getTrackById(params.id);

    if (!track) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.deleteTrack(params.id);

    return {
      message: 'Track deleted from favorites successfully',
    };
  }

  @Post('favs/album/:id')
  addAlbum(@Param() params: IdParamsDto): { message: string } {
    const album = this.albumService.getAlbumById(params.id);

    if (!album) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.addAlbum(params.id);

    return {
      message: 'Album added successfully',
    };
  }

  @Delete('favs/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param() params: IdParamsDto): { message: string } {
    const album = this.albumService.getAlbumById(params.id);

    if (!album) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.deleteAlbum(params.id);

    return {
      message: 'Album deleted from favorites successfully',
    };
  }

  @Post('favs/artist/:id')
  addArtist(@Param() params: IdParamsDto): { message: string } {
    const artist = this.artistService.getArtistById(params.id);

    if (!artist) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.addArtist(params.id);

    return {
      message: 'Album added successfully',
    };
  }

  @Delete('favs/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param() params: IdParamsDto): { message: string } {
    const artist = this.artistService.getArtistById(params.id);

    if (!artist) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.deleteArtist(params.id);

    return {
      message: 'Album deleted from favorites successfully',
    };
  }
}
