import { Exclude } from 'class-transformer';
import { RELATIONS_OPTIONS } from 'src/constants';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FavouriteEntity } from './favorite.entity';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Exclude()
  @ManyToOne(() => FavouriteEntity, (favorites) => favorites.albums, {
    nullable: RELATIONS_OPTIONS.nullable,
    onDelete: RELATIONS_OPTIONS.onDelete,
  })
  favorites: FavouriteEntity;
}
