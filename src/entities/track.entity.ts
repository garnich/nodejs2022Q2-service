import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

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

    //add connections to artist and album
}
