import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { TrackEntity } from './track.entity';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Exclude()
  @OneToMany(() => AlbumEntity, (album) => album.artist, { cascade: true })
  albums: AlbumEntity[];

  @Exclude()
  @OneToMany(() => TrackEntity, (track) => track.artistId, { cascade: true })
  tracks: TrackEntity[];
}
