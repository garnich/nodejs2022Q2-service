import { Injectable } from "@nestjs/common";
import { IFavorites } from "./favorites.interface";
import { ITracks } from "src/tracks/tracks.interface";
import { IAlbums } from "src/albums/albums.interface";
import { IArtists } from "src/artists/artists.interface";


@Injectable()
export class FavoritesService {
    private static favorites: IFavorites;

    constructor() {
      FavoritesService.favorites = {
        albums: [],
        artists: [],
        tracks: []
      };
    }

    getAll(): IFavorites {
        return FavoritesService.favorites;
    }

    addTrackToFavorites(track: ITracks) {
        FavoritesService.favorites.tracks.push(track);

        return track;
      }
    
    removeTrackFromFavorites(id: string) {
      return FavoritesService.favorites.tracks.filter((track) => track.id !== id)
    }

    addAlbumToFavorites(album: IAlbums) {
      FavoritesService.favorites.albums.push(album);

      return album;
    }
  
    removeAlbumFromFavorites(id: string) {
      return FavoritesService.favorites.albums.filter((album) => album.id !== id)
    }

    addArtistToFavorites(artist: IArtists) {
      FavoritesService.favorites.artists.push(artist);

      return artist;
    }
  
    removeArtistFromFavorites(id: string) {
      return FavoritesService.favorites.artists.filter((artist) => artist.id !== id)
    }
}
