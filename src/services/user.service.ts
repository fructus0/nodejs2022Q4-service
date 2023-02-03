import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { ExceptionMessages } from '../constants/exceptionMessages';

export class UserService {
  constructor(private users: UserEntity[] = []) {}

  getUsers(): UserEntity[] {
    return this.users;
  }

  getUserById(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto): UserEntity {
    const createdUser = new UserEntity(
      createUserDto.login,
      createUserDto.password,
    );

    this.users.push(createdUser);

    return createdUser;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const targetUser = this.users.find((user) => user.id === id);

    if (!targetUser) {
      throw new NotFoundException();
    }

    if (targetUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(ExceptionMessages.INVALID_PASSWORD);
    }

    targetUser.updatePassword(updateUserDto.newPassword);

    return targetUser;
  }

  deleteUser(id: string): UserEntity {
    const targetUser = this.users.find((user) => user.id === id);

    if (!targetUser) {
      throw new NotFoundException();
    }

    this.users = this.users.filter((user) => user.id !== targetUser.id);

    return targetUser;
  }
}
