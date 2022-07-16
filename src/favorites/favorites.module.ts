import { Module } from "@nestjs/common";
import { FavoritesController } from "./favorites.controller";
import { AlbumsService } from "src/albums/albums.service";
import { TracksService } from "src/tracks/tracks.service";
import { ArtistsService } from "src/artists/artists.service";

@Module({
    controllers: [FavoritesController],
    providers: [ArtistsService, TracksService, AlbumsService],
})

export class FavoritesModule {}
