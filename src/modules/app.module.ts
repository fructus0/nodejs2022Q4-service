import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationException } from '../exceptions/validation.exception';
import { ValidationExceptionFilter } from '../filters/validation-exeptions.filter';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
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
