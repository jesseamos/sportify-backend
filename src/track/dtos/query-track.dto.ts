import { IsString } from "class-validator";

export class QueryTrackDto {
    @IsString()
    artist_name: string

    @IsString()
    album_title: string
}