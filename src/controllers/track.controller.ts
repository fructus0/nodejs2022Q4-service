import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { IdParamsDto } from '../dto/id-params.dto';
import { TrackService } from '../services/track.service';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class TrackController {
  constructor(private readonly artistService: TrackService) {}

  @Get('track')
  getTracks(): TrackEntity[] {
    return this.artistService.getTracks();
  }

  @Get('track/:id')
  getTrackById(@Param() params: IdParamsDto): TrackEntity {
    return this.artistService.getTrackById(params.id);
  }

  @Post('track')
  createTrack(@Body() body: CreateTrackDto): TrackEntity {
    return this.artistService.createTrack(body);
  }

  @Put('track/:id')
  updateTrack(
    @Param() params: IdParamsDto,
    @Body() body: UpdateTrackDto,
  ): TrackEntity {
    return this.artistService.updateTrack(params.id, body);
  }
}
