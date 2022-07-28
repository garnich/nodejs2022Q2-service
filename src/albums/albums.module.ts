import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/entities/album.entity';

@Module({
  controllers: [AlbumsController],
  imports: [
    forwardRef(() => TracksModule), 
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([AlbumEntity])
  ],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
