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
import { ArtistService } from '../artists/artist.service';
import { TrackService } from '../tracks/track.service';
import { AlbumService } from '../albums/album.service';
import { FavoriteService } from './favorite.service';
import { IdParamsDto } from '../app/dto/id-params.dto';
import { ExceptionMessages } from '../constants/exceptionMessages';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetFavoritesResponseDto } from './dto/get-favorites-response.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Favorites')
@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Get()
  getFavorites(): GetFavoritesResponseDto {
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

  @Post('track/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track added successfully',
  })
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

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track deleted from favorites successfully',
  })
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

  @Post('album/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album added successfully',
  })
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

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album deleted from favorites successfully',
  })
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

  @Post('artist/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist added successfully',
  })
  addArtist(@Param() params: IdParamsDto) {
    const artist = this.artistService.getArtistById(params.id);

    if (!artist) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.addArtist(params.id);

    return {
      message: 'Artist added successfully',
    };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist deleted from favorites successfully',
  })
  deleteArtist(@Param() params: IdParamsDto): { message: string } {
    const artist = this.artistService.getArtistById(params.id);

    if (!artist) {
      throw new UnprocessableEntityException(ExceptionMessages.TRACK_NOT_FOUND);
    }

    this.favoriteService.deleteArtist(params.id);

    return {
      message: 'Artist deleted from favorites successfully',
    };
  }
}
