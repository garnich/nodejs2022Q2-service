import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { IBaseUser } from './user.interface';
import { UsersService } from './users.service';
import { IDValidator, invalidIdExeption, itemNotExistExeption } from 'src/helpers';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): IBaseUser[] {
        return this.userService.getUsers();
    }

    @Post()
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body(new ValidationPipe()) CreateUserDto: UserDto): IBaseUser {
        return this.userService.createUser(CreateUserDto);
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    updateUserPass(@Body(new ValidationPipe()) updateUserDto: UpdateUserDto, @Param('id') id: string): IBaseUser {
        if(!IDValidator(id)) throw invalidIdExeption();

        const isUserExist: boolean = !!this.userService.getUser(id);

        if(!isUserExist) throw itemNotExistExeption('user');

        return this.userService.updateUserPass(id, updateUserDto); 
    }

    @Delete(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param('id') id: string){
        if(!IDValidator(id)) throw invalidIdExeption();

        const isUserExist: boolean = !!this.userService.getUser(id);

        if(!isUserExist) throw itemNotExistExeption('user');

        return this.userService.deleteUser(id);
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: string): IBaseUser {
        if(!IDValidator(id)) throw invalidIdExeption();

        const isUserExist: boolean = !!this.userService.getUser(id);

        if(!isUserExist) throw itemNotExistExeption('user');

        return this.userService.getUser(id);
    }
}
