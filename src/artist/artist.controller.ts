import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dtos/artist.dto';

@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) { }

    @Post('/create')
    createArtist(@Body() body: ArtistDto) {
        return this.artistService.create(body)
    }

    @Get()
    listAllArtist() {
        return this.artistService.listAll()
    }
    @Patch('/:id')
    updateArtist(@Param('id') id: string, @Body() body: ArtistDto) {
        return this.artistService.update(id, body)
    }

    @Delete('/:id')
    deleteArtist(@Param('id') id: string) {
        console.log(id)
        return this.artistService.delete(id)
    }
}
