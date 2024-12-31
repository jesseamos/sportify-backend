import { Body, Controller, forwardRef, Inject, Post, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistDTO } from './dtos/playlist.dto';
import { CurrentUser } from 'src/decorators/get-current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@UseGuards(AuthGuard)
@Controller('playlist')
export class PlaylistController {
    constructor(
        private playlistService: PlaylistService,
    ) { }
    @Post('/create')
    createPlaylist(@Body() body: PlaylistDTO, @CurrentUser() user: Partial<PlaylistDTO>) {
        return this.playlistService.create(body, user)
    }
}
