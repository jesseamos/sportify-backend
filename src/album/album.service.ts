import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Albums } from './entity/album.entity';
import { Repository } from 'typeorm';
import { AlbumDto } from './dtos/album.dto';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
    constructor(@InjectRepository(Albums) private repo: Repository<Albums>, private artistService: ArtistService) { }

    async create(body: AlbumDto, artistName: string) {
        const album = this.repo.create(body)
        const [artist] = await this.artistService.find(artistName)
        if (!artist) {
            throw new BadRequestException("artist doesn't exist")
        }
        album.artist = artist
        this.repo.save(album)
        return album
    }

    getAll() {
        return this.repo.find()
    }

    async find(title: string) {
        return await this.repo.findBy({ title })
    }

    async update(id: string, body: AlbumDto) {
        const album = await this.repo.findBy({ id: parseInt(id) })
        if (!album) {
            throw new NotFoundException("can't find album with an id of " + id)
        }

        await this.repo.update(id, body)
        return album

    }
    async delete(id: string) {
        console.log(id)
        const [album] = await this.repo.findBy({ id: parseInt(id) })
        if (!album) {
            throw new NotFoundException("can't find album with an id of " + id)
        }

        this.repo.remove(album)
    }
}
