import { IsInt, IsString, IsUUID } from 'class-validator';
import { UUID_VERSION } from '../constants/common';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID(UUID_VERSION)
  artistId: string | null;

  @IsUUID(UUID_VERSION)
  albumId: string | null;

  @IsInt()
  duration: number;
}
