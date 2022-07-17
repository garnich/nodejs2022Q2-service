import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { IAlbums } from './albums.interface'
import { AlbumsService } from './albums.service';
import { IDValidator, invalidIdExeption, itemNotExistExeption } from 'src/helpers';
import { TracksService } from 'src/tracks/tracks.service';


@Controller('albums')
export class AlbumsController {
    constructor(
        private readonly albumService: AlbumsService,
        private readonly trackService: TracksService
    ) {}

    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): IAlbums[] {
        return this.albumService.getAlbums();
    }

    @Post()
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    createAlbum(@Body(new ValidationPipe()) CreateAlbumDto: CreateAlbumDto): IAlbums {
        return this.albumService.createAlbum(CreateAlbumDto);
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    updateAlbum(@Body(new ValidationPipe()) UpdateAlbumDto: UpdateAlbumDto, @Param('id') id: string): AlbumDto {
        if(!IDValidator(id)) throw invalidIdExeption();

        const isAlbumExist: boolean = !!this.albumService.getAlbum(id);

        if(!isAlbumExist) throw itemNotExistExeption('album');

        return this.albumService.updateAlbum(id, UpdateAlbumDto); 
    }

    @Delete(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAlbum(@Param('id') id: string){
        if(!IDValidator(id)) throw invalidIdExeption();

        const isAlbumExist: boolean = !!this.albumService.getAlbum(id);

        if(!isAlbumExist) {
            throw itemNotExistExeption('album');
        } else {
            this.albumService.deleteAlbum(id);
            this.trackService.removeNotExistingAlbumId(id);
        }

        return this.albumService.deleteAlbum(id);
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: string): IAlbums {
        if(!IDValidator(id)) throw invalidIdExeption();

        const isAlbumExist: boolean = !!this.albumService.getAlbum(id);

        if(!isAlbumExist) throw itemNotExistExeption('album');

        return this.albumService.getAlbum(id);
    }
}
