import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entity/track.entity';
import { Repository } from 'typeorm';
import { TrackDto } from './dtos/track.dto';
import { AlbumService } from 'src/album/album.service';
import { QueryTrackDto } from './dtos/query-track.dto';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class TrackService {
    constructor(@InjectRepository(Track) private repo: Repository<Track>, private albumService: AlbumService, private artistService: ArtistService) { }

    async create(body: TrackDto, { album_title, artist_name }: QueryTrackDto) {
        const track = this.repo.create(body)
        const [album] = await this.albumService.find(album_title)
        const [artist] = await this.artistService.find(artist_name)
        track.album_id = album
        track.artist = artist
        this.repo.save(track)
        return track
    }

    listAll() {
        return this.repo.find()
    }
    async update(id: string, body: TrackDto) {
        const track = await this.repo.findBy({ id: parseInt(id) })
        if (!track) {
            throw new NotFoundException("can't find track with an id of " + id)
        }

        await this.repo.update(id, body)

    }

    async findByTitle(title: string) {
        const track = await this.repo.findBy({ title })
        if (!track) {
            throw new NotFoundException("can't find track with title:" + title)
        }
        return track
    }

    async delete(id: string) {
        const [track] = await this.repo.findBy({ id: parseInt(id) })
        if (!track) {
            throw new NotFoundException("can't find track with an id of " + id)
        }

        this.repo.remove(track)
    }
}
