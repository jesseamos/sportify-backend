import { User } from "src/auth/entity/user.entity";
import { Track } from "src/track/entity/track.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, ManyToMany } from "typeorm";

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @ManyToOne(() => User, (user) => user.playlist)
    owner_id: User
    @Column()
    visibility: boolean
    // @Column()
    // created_at: string
    // @Column()
    // updated_at: string
    @ManyToMany(() => Track, (track) => track.playlist)
    track_list: Track[]
    @Column()
    cover_image: string
    @Column()
    total_duration: string
    @Column('simple-array')
    genres: string[]
}


