import { IsUUID } from 'class-validator';

const UUID_VERSION = 4;

export class IdParamsDto {
  @IsUUID(UUID_VERSION)
  id?: string;
}
