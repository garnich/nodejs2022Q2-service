import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistDto } from './dto/artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { IArtists } from './artists.interface'
import { ArtistsService } from './artists.service';
import { IDValidator, invalidIdExeption, itemNotExistExeption } from 'src/helpers';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';


@Controller('artist')
export class ArtistsController {
    constructor(
        private readonly artistService: ArtistsService,
        private readonly trackService: TracksService,
        private readonly albumService: AlbumsService,
        private readonly favoritesService: FavoritesService,
    ) {}

    @Get()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): IArtists[] {
        return this.artistService.getArtists();
    }

    @Post()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    createArtist(@Body(new ValidationPipe()) CreateArtistDto: CreateArtistDto): IArtists {
        return this.artistService.createArtist(CreateArtistDto);
    }

    @Put(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    updateArtist(@Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string): ArtistDto {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isArtistExist: boolean = !!this.artistService.getArtist(id);
            
            if(!isArtistExist) {
                throw itemNotExistExeption('artist');
            } else {
                return this.artistService.updateArtist(id, updateArtistDto); 
            }
        }
    }

    @Delete(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string){
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isArtistExist: boolean = !!this.artistService.getArtist(id);
            
            if(!isArtistExist) {
                throw itemNotExistExeption('artist');
            } else {
                const isItemInFavorites: boolean = this.favoritesService.isItemInFavorites(id, 'albums');
                
                if(isItemInFavorites) {
                    this.favoritesService.removeArtistFromFavorites(id);
                }

                this.artistService.deleteArtist(id);
                this.trackService.removeNotExistingArtistId(id);
                this.albumService.removeNotExistingArtistId(id);
            }
        }
    }

    @Get(':id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isArtistExist: boolean = !!this.artistService.getArtist(id);
            
            if(!isArtistExist) {
                throw itemNotExistExeption('artist');
            } else {
                return this.artistService.getArtist(id);
            }
        }
    }
}
