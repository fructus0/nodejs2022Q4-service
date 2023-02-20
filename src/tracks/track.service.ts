import { NotFoundException } from '@nestjs/common';

import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

export class TrackService {
  constructor(private tracks: TrackEntity[] = []) {}

  getTracks(): TrackEntity[] {
    return this.tracks;
  }

  getTrackById(id: string): TrackEntity {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(createTrackDto: CreateTrackDto): TrackEntity {
    const createdTrack = new TrackEntity(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );

    this.tracks.push(createdTrack);

    return createdTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): TrackEntity {
    const targetTrack = this.tracks.find((track) => track.id === id);

    if (!targetTrack) {
      throw new NotFoundException();
    }

    targetTrack.updateInfo(updateTrackDto);

    return targetTrack;
  }

  deleteTrack(id: string): TrackEntity {
    const targetTrack = this.tracks.find((track) => track.id === id);

    if (!targetTrack) {
      throw new NotFoundException();
    }

    this.tracks = this.tracks.filter((track) => track.id !== targetTrack.id);

    return targetTrack;
  }

  formatTracksAfterArtistDeletion(artistId: string): void {
    this.tracks = this.tracks.map((track) => ({
      ...track,
      updateInfo: track.updateInfo,
      artistId: track.artistId === artistId ? null : track.artistId,
    }));
  }

  formatTracksAfterAlbumDeletion(albumId: string): void {
    this.tracks = this.tracks.map((track) => ({
      ...track,
      updateInfo: track.updateInfo,
      albumId: track.albumId === albumId ? null : track.albumId,
    }));
  }
}
