import { NotFoundException } from '@nestjs/common';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

export class AlbumService {
  constructor(private albums: AlbumEntity[] = []) {}

  getAlbums(): AlbumEntity[] {
    return this.albums;
  }

  getAlbumById(id: string): AlbumEntity | undefined {
    return this.albums.find((track) => track.id === id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const createdAlbum = new AlbumEntity(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );

    this.albums.push(createdAlbum);

    return createdAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    const targetAlbum = this.albums.find((album) => album.id === id);

    if (!targetAlbum) {
      throw new NotFoundException();
    }

    targetAlbum.updateInfo(updateAlbumDto);

    return targetAlbum;
  }

  deleteAlbum(id: string): AlbumEntity {
    const targetAlbum = this.albums.find((track) => track.id === id);

    if (!targetAlbum) {
      throw new NotFoundException();
    }

    this.albums = this.albums.filter((track) => track.id !== targetAlbum.id);

    return targetAlbum;
  }

  formatAlbumsAfterArtistDeletion(artistId: string): void {
    this.albums = this.albums.map((album) => ({
      ...album,
      updateInfo: album.updateInfo,
      artistId: album.artistId === artistId ? null : album.artistId,
    }));
  }
}
