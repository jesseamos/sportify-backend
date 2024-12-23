import { Albums } from "src/album/entity/album.entity";
import { Artist } from "src/artist/entity/artist.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => Artist, (artist) => artist.track_list)
    artist: Artist


    @ManyToOne(() => Albums, (albums) => albums.track_list)
    album_id: Albums

    @Column()
    duration: string

    @Column()
    url: string

    @Column('simple-array')
    genres: string[]

    @Column()
    explicit: boolean

}