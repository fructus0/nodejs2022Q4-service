import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { IdParamsDto } from '../app/dto/id-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): UserEntity[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() params: IdParamsDto): UserEntity {
    const user = this.userService.getUserById(params.id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto): UserEntity {
    return this.userService.createUser(body);
  }

  @Put(':id')
  updateUser(
    @Param() params: IdParamsDto,
    @Body() body: UpdateUserDto,
  ): UserEntity {
    return this.userService.updateUser(params.id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() params: IdParamsDto): Record<string, never> {
    this.userService.deleteUser(params.id);

    return {};
  }
}
