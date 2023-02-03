import { IsUUID } from 'class-validator';
import { UUID_VERSION } from '../constants/common';

export class IdParamsDto {
  @IsUUID(UUID_VERSION)
  id?: string;
}
