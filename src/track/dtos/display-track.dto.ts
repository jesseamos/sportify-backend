import { Expose, Transform } from "class-transformer"

export class DisplayTrackDto {
    @Expose()
    title: string

    @Expose()
    duration: string

    @Expose()
    url: string

    @Expose()
    genres: string[]

    @Expose()
    explicit: boolean

    @Transform(({ obj }) => obj.artist.id)
    @Expose()
    artist_id: number

    @Transform(({ obj }) => obj.album_id.id)
    @Expose()
    album_id: number

}