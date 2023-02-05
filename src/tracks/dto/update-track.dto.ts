import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';
import { UUID_VERSION } from '../../constants/common';
import { ExceptionMessages } from '../../constants/exceptionMessages';

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsUUID(UUID_VERSION, {
    message: ExceptionMessages.MUST_BE_NULL_OR_UUID,
  })
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsUUID(UUID_VERSION, {
    message: ExceptionMessages.MUST_BE_NULL_OR_UUID,
  })
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsInt()
  duration: number;
}
