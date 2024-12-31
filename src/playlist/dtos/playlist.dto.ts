import { IsString, IsNumber, IsBoolean, IsArray } from "class-validator";
export class PlaylistDTO {
    @IsString()
    name: string
    @IsString()
    description: string
    @IsBoolean()
    visibility: boolean
    @IsString()
    // created_at: string
    // @IsString()
    // updated_at: string
    @IsString()
    cover_image: string
    @IsString()
    total_duration: string
    @IsArray()
    genres: string[]
    @IsArray()
    tracks: string[]

}