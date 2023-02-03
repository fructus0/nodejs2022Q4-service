import { NotFoundException } from '@nestjs/common';

import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export class TrackService {
  constructor(private tracks: TrackEntity[] = []) {}

  getTracks(): TrackEntity[] {
    return this.tracks;
  }

  getTrackById(id: string): TrackEntity {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
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
}
