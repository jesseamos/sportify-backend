import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class AlbumDto {
    @IsString()
    title: string

    @IsString()
    //@IsDate()
    release_date: string;

    @IsArray()
    genres: string[]

    @IsString()
    cover_image: string
}
