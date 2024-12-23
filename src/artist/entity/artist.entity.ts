import { Albums } from "src/album/entity/album.entity";
import { Track } from "src/track/entity/track.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";

import { } from "typeorm";
@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    bio: string

    @Column('simple-array')
    genres: string[]

    @Column()
    image: string

    @OneToMany(() => Albums, (ablums) => ablums.artist)
    albums: Albums[]

    @OneToMany(() => Track, (track) => track.artist)
    track_list: Track[]

    @Column({
        type: 'text',
        transformer: {
            to: (value: any) => JSON.stringify(value),
            from: (value: string) => JSON.parse(value),
        },
    })
    social_link: { x: string, instagram: string, facebook: string }
}