import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from '../users/user.controller';
import { UserService } from '../users/user.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationException } from '../exceptions/validation.exception';
import { ValidationExceptionFilter } from '../filters/validation-exeptions.filter';
import { ArtistController } from '../artists/artist.controller';
import { ArtistService } from '../artists/artist.service';
import { TrackController } from '../tracks/track.controller';
import { TrackService } from '../tracks/track.service';
import { AlbumController } from '../albums/album.controller';
import { AlbumService } from '../albums/album.service';
import { FavoriteController } from '../favorites/favorite.controller';
import { FavoriteService } from '../favorites/favorite.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    TrackController,
    AlbumController,
    FavoriteController,
  ],
  providers: [
    AppService,
    UserService,
    ArtistService,
    TrackService,
    AlbumService,
    FavoriteService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        exceptionFactory: (errors) => {
          return new ValidationException(errors);
        },
      }),
    },
  ],
})
export class AppModule {}
