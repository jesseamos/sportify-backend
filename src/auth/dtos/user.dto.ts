import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: number
    @Expose()
    user_name: string

    @Expose()
    email: string

}