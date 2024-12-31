import { Playlist } from "src/playlist/entity/playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    user_name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Playlist, (playlist) => playlist.owner_id)
    playlist: Playlist[]

}