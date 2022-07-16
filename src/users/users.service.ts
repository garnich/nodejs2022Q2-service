import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IBaseUser, IFullUser } from './user.interface';

@Injectable()
export class UsersService {
    private static users: IFullUser[] = [];

    constructor() {
      UsersService.users = [];
    }

    getUsers(): IBaseUser[] {
        return UsersService.users;
    }

    createUser(user: UserDto): IBaseUser {
        const dateNow = new Date().valueOf();

        const newUser: IFullUser = {
          id: uuidv4(),
          login: user.login,
          password: user.password,
          version: 1,
          createdAt: dateNow,
          updatedAt: dateNow,
        };
    
        UsersService.users.push(newUser);
    
        return {
          id: newUser.id,
          login: newUser.login,
          version: newUser.version,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        };
      }

    getUser(id: string): IBaseUser {
        const user = UsersService.users.find((user: IFullUser) => user.id === id);
        
        return {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
    }

    updateUserPass(id: string, payload: UpdateUserDto): IBaseUser {
      const { oldPassword, newPassword } = payload;

      const idx = UsersService.users.findIndex((user) => user.id === id);
      
      if (oldPassword === UsersService.users[idx].password) {
        const newUserData = {
          password: newPassword,
          updatedAt: new Date().valueOf(),
          version: UsersService.users[idx].version + 1,
        };

        UsersService.users[idx] = {
          ...UsersService.users[idx],
          ...newUserData
        };
        
        return {
          id: UsersService.users[idx].id,
          login: UsersService.users[idx].login,
          version: UsersService.users[idx].version,
          createdAt: UsersService.users[idx].createdAt,
          updatedAt: UsersService.users[idx].updatedAt,
        };
      }  
    }

    deleteUser(id: string) {
      const idx = UsersService.users.findIndex((user: IBaseUser) => user.id === id);
      UsersService.users = [...UsersService.users.slice(0, idx), ...UsersService.users.slice(idx + 1)];
    }
}
