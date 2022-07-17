import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/user.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    UsersModule,
    FavoritesModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
