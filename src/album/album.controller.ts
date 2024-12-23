import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dtos/album.dto';
import { Serialize } from 'src/interceptors/custom.interceptors';
import { DisplayAlbumDto } from './dtos/display-album.dto';


@Controller('album')
@Serialize(DisplayAlbumDto)
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Post()
    createAlbum(@Query('artist') query: string, @Body() body: AlbumDto) {
        return this.albumService.create(body, query)
    }

    @Get()
    getAllAlbums() {
        return this.albumService.getAll()
    }

    @Patch('/:id')
    updateArtist(@Param('id') id: string, @Body() body: AlbumDto) {
        return this.albumService.update(id, body)
    }

    @Delete('/:id')
    deleteArtist(@Param('id') id: string) {
        console.log(id)
        return this.albumService.delete(id)
    }
}
