import { v4 as uuidv4 } from 'uuid';
import { Exclude } from 'class-transformer';

export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class UserEntity implements UserAttributes {
  public login: string;
  public version = 1;
  public createdAt: number = Date.now();
  public updatedAt: number = Date.now();
  public id: string = uuidv4();

  @Exclude()
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  public updatePassword(newPassword: string) {
    this.password = newPassword;
    this.updatedAt = Date.now();
    this.version += 1;
  }
}
