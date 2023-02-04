import { FavoriteEntity } from '../entities/favorite.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ExceptionMessages } from '../constants/exceptionMessages';

export class FavoriteService {
  constructor(
    private favorites: FavoriteEntity = {
      artists: [],
      albums: [],
      tracks: [],
    },
  ) {}

  getFavorites(): FavoriteEntity {
    return this.favorites;
  }

  addTrack(trackId: string) {
    const { tracks } = this.favorites;

    if (tracks.includes(trackId)) {
      throw new BadRequestException(ExceptionMessages.ALREADY_IN_FAVORITES);
    }

    tracks.push(trackId);
  }

  deleteTrack(trackId: string) {
    const { tracks } = this.favorites;

    if (!tracks.includes(trackId)) {
      throw new NotFoundException(ExceptionMessages.NOT_FOUND_IN_FAVORITES);
    }

    this.favorites.tracks = tracks.filter((track) => track !== trackId);
  }

  addAlbum(albumId: string) {
    const { albums } = this.favorites;

    if (albums.includes(albumId)) {
      throw new BadRequestException(ExceptionMessages.ALREADY_IN_FAVORITES);
    }

    albums.push(albumId);
  }

  deleteAlbum(albumId: string) {
    const { albums } = this.favorites;
    if (!albums.includes(albumId)) {
      throw new BadRequestException(ExceptionMessages.NOT_FOUND_IN_FAVORITES);
    }

    this.favorites.albums = albums.filter((album) => album !== albumId);
  }

  addArtist(artistId: string) {
    const { artists } = this.favorites;

    if (artists.includes(artistId)) {
      throw new BadRequestException(ExceptionMessages.ALREADY_IN_FAVORITES);
    }

    artists.push(artistId);
  }

  deleteArtist(artistId: string) {
    const { artists } = this.favorites;
    if (!artists.includes(artistId)) {
      throw new BadRequestException(ExceptionMessages.NOT_FOUND_IN_FAVORITES);
    }

    this.favorites.artists = artists.filter((artist) => artist !== artistId);
  }
}
