import { IsString, IsArray, IsBoolean } from "class-validator";

export class TrackDto {
    @IsString()
    title: string

    @IsString()
    duration: string

    @IsString()
    url: string

    @IsArray()
    genres: string[]

    @IsBoolean()
    explicit: boolean
}