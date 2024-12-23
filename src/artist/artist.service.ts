import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entity/artist.entity';
import { Repository } from 'typeorm';
import { ArtistDto } from './dtos/artist.dto';

@Injectable()
export class ArtistService {
    constructor(@InjectRepository(Artist) private repo: Repository<Artist>) { }

    create(body: Partial<Artist>) {
        const artist = this.repo.create(body)
        this.repo.save(artist)
        return artist
    }
    async find(name: string) {
        return await this.repo.findBy({ name: name })
    }
    listAll() {
        return this.repo.find()
    }
    async update(id: string, body: ArtistDto) {
        const artist = await this.repo.findBy({ id: parseInt(id) })
        if (!artist) {
            throw new NotFoundException("can't find artist with an id of " + id)
        }

        await this.repo.update(id, body)
        return artist

    }
    async delete(id: string) {
        console.log(id)
        const [artist] = await this.repo.findBy({ id: parseInt(id) })
        if (!artist) {
            throw new NotFoundException("can't find artist with an id of " + id)
        }

        this.repo.remove(artist)
    }
}
