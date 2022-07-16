import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-albumdto';

import { IAlbums } from './albums.interface'
import { AlbumsService } from './albums.service';


@Controller('albums')
export class AlbumsController {
    constructor(private readonly albumService: AlbumsService) {}

    @Get()
    findAll(): IAlbums[] {
        return this.albumService.getAlbums();
    }

    @Post()
    createAlbum(@Body(new ValidationPipe()) CreateAlbumDto: CreateAlbumDto): IAlbums {
        return this.albumService.createAlbum(CreateAlbumDto);
    }

    @Put(':id')
    updateAlbum(@Body(new ValidationPipe()) UpdateAlbumDto: UpdateAlbumDto, @Param('id') id: string): AlbumDto {
        return this.albumService.updateAlbum(id, UpdateAlbumDto); 
    }

    @Delete(':id')
    deleteAlbum(@Param('id') id: string){
        return this.albumService.deleteAlbum(id);
    }

    @Get(':id')
    findById(@Param('id') id: string): IAlbums {
        return this.albumService.getAlbum(id);
    }
}
