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

import { ArtistService } from '../services/artist.service';
import { ArtistEntity } from '../entities/artist.entity';
import { IdParamsDto } from '../dto/id-params.dto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('artist')
  getArtists(): ArtistEntity[] {
    return this.artistService.getArtists();
  }

  @Get('artist/:id')
  getArtistById(@Param() params: IdParamsDto): ArtistEntity {
    return this.artistService.getArtistById(params.id);
  }

  @Post('artist')
  createArtist(@Body() body: CreateArtistDto): ArtistEntity {
    return this.artistService.createArtist(body);
  }

  @Put('artist/:id')
  updateArtist(
    @Param() params: IdParamsDto,
    @Body() body: UpdateArtistDto,
  ): ArtistEntity {
    return this.artistService.updateArtist(params.id, body);
  }
}
