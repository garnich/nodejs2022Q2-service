import { Module } from "@nestjs/common";
import { FavoritesController } from "./favorites.controller";
import { AlbumsService } from "src/albums/albums.service";
import { TracksService } from "src/tracks/tracks.service";
import { ArtistsService } from "src/artists/artists.service";
import { FavoritesService } from "./favorites.service";

@Module({
    providers: [FavoritesService, AlbumsService, TracksService, ArtistsService],
    controllers: [FavoritesController],
})

export class FavoritesModule {}
