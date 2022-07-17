import { Module, forwardRef } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ArtistsController } from "./artists.controller";
import { TracksService } from "src/tracks/tracks.service";
import { AlbumsService } from "src/albums/albums.service";
import { AlbumsModule } from "src/albums/albums.module";
import { TracksModule } from "src/tracks/tracks.module";
import { FavoritesModule } from "src/favorites/favorites.module";

@Module({
    controllers: [ArtistsController],
    imports: [
        forwardRef(() => TracksModule),
        forwardRef(() => AlbumsModule),
        forwardRef(() => FavoritesModule),
      ],
    providers: [ArtistsService],
    exports: [ArtistsService],
})

export class ArtistsModule {}
