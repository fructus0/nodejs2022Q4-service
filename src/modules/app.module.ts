import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationException } from '../exceptions/validation.exception';
import { ValidationExceptionFilter } from '../filters/validation-exeptions.filter';
import { ArtistController } from '../controllers/artist.controller';
import { ArtistService } from '../services/artist.service';
import { TrackController } from '../controllers/track.controller';
import { TrackService } from '../services/track.service';
import { AlbumController } from '../controllers/album.controller';
import { AlbumService } from '../services/album.service';
import { FavoriteController } from '../controllers/favorite.controller';
import { FavoriteService } from '../services/favorite.service';

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
