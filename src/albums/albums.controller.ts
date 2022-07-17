import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { IAlbums } from './albums.interface'
import { AlbumsService } from './albums.service';
import { IDValidator, invalidIdExeption, itemNotExistExeption } from 'src/helpers';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';


@Controller('album')
export class AlbumsController {
    constructor(
        private readonly albumService: AlbumsService,
        private readonly trackService: TracksService,
        private readonly favoritesService: FavoritesService
    ) {}

    @Get()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): IAlbums[] {
        return this.albumService.getAlbums();
    }

    @Post()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    createAlbum(@Body(new ValidationPipe()) CreateAlbumDto: CreateAlbumDto): IAlbums {
        return this.albumService.createAlbum(CreateAlbumDto);
    }

    @Put(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    updateAlbum(@Body(new ValidationPipe()) UpdateAlbumDto: UpdateAlbumDto, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string): AlbumDto {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isAlbumExist: boolean = !!this.albumService.getAlbum(id);

            if(!isAlbumExist) {
                throw itemNotExistExeption('album');
            } else {
                return this.albumService.updateAlbum(id, UpdateAlbumDto); 
            }
        }
    }

    @Delete(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string){
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isAlbumExist: boolean = !!this.albumService.getAlbum(id);
            
            if(!isAlbumExist) {
                throw itemNotExistExeption('album');
            } else {
                const isItemInFavorites: boolean = this.favoritesService.isItemInFavorites(id, 'albums');
                
                if(isItemInFavorites) {
                    this.favoritesService.removeAlbumFromFavorites(id);
                }
                
                this.albumService.deleteAlbum(id);
                this.trackService.removeNotExistingAlbumId(id);
            }
        }
    }

    @Get(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): IAlbums {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const album = this.albumService.getAlbum(id);

            if(!album) {
                throw itemNotExistExeption('album');
            } else {
                return album;
            }
        }
    }
}
