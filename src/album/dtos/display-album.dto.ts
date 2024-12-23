import { Expose, Transform } from "class-transformer";

export class DisplayAlbumDto {
    @Expose()
    title: string

    @Expose()
    //@IsDate()
    release_date: string;

    @Expose()
    genres: string[]

    @Expose()
    @Transform(({ obj }) => obj.artist.id)
    artistId: number

    @Expose()
    cover_image: string
}
