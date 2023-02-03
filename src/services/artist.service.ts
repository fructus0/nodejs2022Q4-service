import { ArtistEntity } from '../entities/artist.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class ArtistService {
  constructor(private artists: ArtistEntity[] = []) {}

  getArtists(): ArtistEntity[] {
    return this.artists;
  }

  getArtistById(id: string): ArtistEntity {
    const targetArtist = this.artists.find((artist) => artist.id === id);

    if (!targetArtist) {
      throw new NotFoundException();
    }

    return targetArtist;
  }

  createArtist(createArtistDto: CreateArtistDto): ArtistEntity {
    const createdArtist = new ArtistEntity(
      createArtistDto.name,
      createArtistDto.grammy,
    );

    this.artists.push(createdArtist);

    return createdArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    const targetArtist = this.artists.find((artist) => artist.id === id);

    if (!targetArtist) {
      throw new NotFoundException();
    }

    targetArtist.updateInfo(updateArtistDto);

    return targetArtist;
  }
}
