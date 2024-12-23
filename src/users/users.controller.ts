import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/custom.interceptors';
import { UserDto } from 'src/auth/dtos/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { UpdateUserDto } from './dtos/update-user.dto';


@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard)
    @Get('/:id')
    fetchUserInfo(@Param('id') id: string) {
        return this.usersService.fetchUser(id)
    }

    @UseGuards(AuthGuard)
    @Patch('update-profile/:id')
    UpdateUserInfo(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.updateUser(parseInt(id), body)
    }
}
