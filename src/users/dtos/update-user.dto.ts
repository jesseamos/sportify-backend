import { IsEmail, IsString } from "class-validator";
export class UpdateUserDto {
    @IsString()
    user_name: string

    @IsEmail()
    @IsString()
    email: string
}