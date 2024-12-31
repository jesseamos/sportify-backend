import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { Repository } from 'typeorm';
import { PlaylistDTO } from './dtos/playlist.dto';
import { UsersService } from 'src/users/users.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class PlaylistService {
    constructor(@InjectRepository(Playlist) private repo: Repository<Playlist>, private userService: UsersService, private trackService: TrackService) { }
    async create(body: PlaylistDTO, user) {
        const [currentUser] = await this.userService.fetchUser(user.sub)
        const tracks = body.tracks
        const playlist = this.repo.create(body)
        playlist.owner_id = currentUser
        for (let t = 0; t < tracks.length; t++) {
            const track = await this.trackService.findByTitle(tracks[t])
            if (!track) {
                continue
            }
            ///DEDUG:you're reassing the track_list to an array instead of appending to it.
            playlist.track_list = track
        }
        // return this.repo.save(playlist)
    }
}
