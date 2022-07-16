import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { IBaseUser } from './user.interface';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll(): IBaseUser[] {
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body(new ValidationPipe()) CreateUserDto: UserDto): IBaseUser {
        return this.userService.createUser(CreateUserDto);
    }

    @Put(':id')
    updateUserPass(@Body(new ValidationPipe()) updateUserDto: UpdateUserDto, @Param('id') id: string): IBaseUser {
        return this.userService.updateUserPass(id, updateUserDto); 
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }

    @Get(':id')
    findById(@Param('id') id: string): IBaseUser {
        return this.userService.getUser(id);
    }
}
