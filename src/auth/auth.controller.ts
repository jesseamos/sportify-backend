import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/custom.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from './guards/auth.guards';
import { Request } from 'express';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signup(@Body() body: CreateUserDto) {
        return this.authService.signup(body.user_name, body.email, body.password)
    }
    @Post('/signin')
    signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password)
    }


    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Req() req: Request) {
        console.log(req.headers.authorization)
        return "hi";
    }


}
