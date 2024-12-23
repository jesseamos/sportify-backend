import { IsString, IsOptional, IsArray, IsObject } from "class-validator";
export class ArtistDto {
    @IsString()
    name: string

    @IsString()
    bio: string

    @IsArray()
    genres: string[]

    @IsString()
    image: string

    @IsOptional()
    @IsObject()
    social_link: { x: string, instagram: string, facebook: string }

}

