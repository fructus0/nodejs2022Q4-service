import { IsUUID } from 'class-validator';
import { UUID_VERSION } from '../../constants/common';

export class CreateFavoriteDto {
  @IsUUID(UUID_VERSION, { each: true })
  artists: string[];
  @IsUUID(UUID_VERSION, { each: true })
  albums: string[];

  @IsUUID(UUID_VERSION, { each: true })
  tracks: string[];
}
