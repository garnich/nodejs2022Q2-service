import { Exclude } from 'class-transformer';
import { RELATIONS_OPTIONS } from 'src/constants';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { FavouriteEntity } from './favorite.entity';

@Entity('tracks')
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;

    @Column({ nullable: true })
    albumId: string;

    @Column({ nullable: true })
    artistId: string;

    @Column()
    duration: number;

    @Exclude()
    @ManyToOne(() => AlbumEntity, RELATIONS_OPTIONS)
    @JoinColumn()
    album: AlbumEntity;
    
    @Exclude()
    @ManyToOne(() => ArtistEntity, RELATIONS_OPTIONS)
    @JoinColumn()
    artist: ArtistEntity;
  
    @Exclude()
    @ManyToOne(() => FavouriteEntity, (favorites) => favorites.tracks)
    favorites: FavouriteEntity;
}
