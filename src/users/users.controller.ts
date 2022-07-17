import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { IBaseUser, IFullUser } from './user.interface';
import { UsersService } from './users.service';
import { IDValidator, invalidIdExeption, itemNotExistExeption } from 'src/helpers';


@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): IBaseUser[] {
        return this.userService.getUsers();
    }

    @Post()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body(new ValidationPipe()) CreateUserDto: UserDto): IBaseUser {
        return this.userService.createUser(CreateUserDto);
    }

    @Put(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    updateUserPass(@Body(new ValidationPipe()) updateUserDto: UpdateUserDto, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string): IBaseUser {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {    
            const isUserExist: boolean = !!this.userService.getUser(id);
            
            if(!isUserExist) {
                throw itemNotExistExeption('user');
            } else {
                return this.userService.updateUserPass(id, updateUserDto); 
            }
        }
    }

    @Delete(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string){
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isUserExist: boolean = !!this.userService.getUser(id);

            if(!isUserExist) {
                throw itemNotExistExeption('user');
            } else {
                return this.userService.deleteUser(id);
            }
        }
    }

    @Get(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): IBaseUser {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const user: IBaseUser = this.userService.getUser(id);

            if(!user) {
                throw itemNotExistExeption('user');
            } else {
                return user;
            }
        }
    }
}
