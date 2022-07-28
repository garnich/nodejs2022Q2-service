import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ArtistEntity } from './artist.entity';
import { FavouriteEntity } from './favorite.entity';
import { RELATIONS_OPTIONS } from 'src/constants';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, RELATIONS_OPTIONS)
  artist: ArtistEntity;

  @Exclude()
  @ManyToOne(() => FavouriteEntity, (favorites) => favorites.albums, {
    nullable: RELATIONS_OPTIONS.nullable,
    onDelete: RELATIONS_OPTIONS.onDelete,
  })
  favorites: FavouriteEntity;
}
