import { Artist } from "src/artist/entity/artist.entity";
import { Track } from "src/track/entity/track.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Albums {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => Artist, (artist) => artist.albums)
    artist: Artist

    @Column()
    release_date: string;

    @Column('simple-array')
    genres: string[]

    @Column()
    cover_image: string

    @OneToMany(() => Track, (track) => track.album_id)
    track_list: Track[]
}

