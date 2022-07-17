import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { IFavorites } from "./favorites.interface";
import { FavoritesService } from './favorites.service';
import { IDValidator, invalidIdExeption, itemNotExistExeption, itemNotInFavoritesExeption } from 'src/helpers';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { ITracks } from 'src/tracks/tracks.interface';
import { IArtists } from 'src/artists/artists.interface';
import { IAlbums } from 'src/albums/albums.interface';


@Controller('favs')
export class FavoritesController {
    constructor(
        private readonly artistService: ArtistsService,
        private readonly trackService: TracksService,
        private readonly albumService: AlbumsService,
        private readonly favoritesService: FavoritesService
    ) {}

    @Get()
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.OK)
    findAll(): IFavorites {
        return this.favoritesService.getAll();
    }

    @Post('track/:id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    addTrackToFavorite(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): ITracks {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const track: ITracks = this.trackService.getTrack(id);
            
            if(!track) {
                throw itemNotInFavoritesExeption('track');
            } else {
                return this.favoritesService.addTrackToFavorites(track);
            }
        }
    }

    @Post('artist/:id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    addArtistToFavorite(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): IArtists {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const artist: IArtists = this.artistService.getArtist(id);
            
            if(!artist) {
                throw itemNotInFavoritesExeption('artist');
            } else {
                return this.favoritesService.addArtistToFavorites(artist);
            }
        }
    }

    @Post('album/:id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    addAlbumToFavorite(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): IAlbums {
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const album: IAlbums = this.albumService.getAlbum(id);
            
            if(!album) {
                throw itemNotInFavoritesExeption('album');
            } else {
                return this.favoritesService.addAlbumToFavorites(album);
            }
        }
    }

    @Delete('track/:id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string){
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isTrackExist: boolean = !!this.trackService.getTrack(id);
            
            if(!isTrackExist) {
                throw itemNotExistExeption('track');
            } else {
                const isItemInFavorites: boolean = this.favoritesService.isItemInFavorites(id, 'tracks');

                if(!isItemInFavorites) {
                    throw itemNotInFavoritesExeption('track');
                } else {   
                    return this.favoritesService.removeTrackFromFavorites(id);
                }
            }
        }
    }

    @Delete('artist/:id')
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
                const isItemInFavorites: boolean = this.favoritesService.isItemInFavorites(id, 'artists');

                if(!isItemInFavorites) {
                    throw itemNotInFavoritesExeption('artist');
                } else {  
                    return this.favoritesService.removeArtistFromFavorites(id);
                }
            }
        }
    }

    @Delete('album/:id')
    @Header('Accept', 'application/json')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string){
        if(!IDValidator(id)) {
            throw invalidIdExeption();
        } else {
            const isAlbumtExist: boolean = !!this.albumService.getAlbum(id);
            
            if(!isAlbumtExist) {
                throw itemNotExistExeption('album');
            } else {
                const isItemInFavorites: boolean = this.favoritesService.isItemInFavorites(id, 'albums');

                if(!isItemInFavorites) {
                    throw itemNotInFavoritesExeption('album');
                } else {  
                    return this.favoritesService.removeAlbumFromFavorites(id);
                } 
            }
        }
    }
}
