import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './dtos/track.dto';
import { Serialize } from 'src/interceptors/custom.interceptors';
import { DisplayTrackDto } from './dtos/display-track.dto';
import { QueryTrackDto } from './dtos/query-track.dto';

@Controller('track')
@Serialize(DisplayTrackDto)
export class TrackController {
    constructor(private trackService: TrackService) { }
    @Post('/create')
    createArtist(@Body() body: TrackDto, @Query() query: QueryTrackDto) {
        console.log(query)
        return this.trackService.create(body, query)
    }

    @Get()
    listAllArtist() {
        return this.trackService.listAll()
    }
    @Patch('/:id')
    updateArtist(@Param('id') id: string, @Body() body: TrackDto) {
        return this.trackService.update(id, body)
    }

    @Delete('/:id')
    deleteArtist(@Param('id') id: string) {
        return this.trackService.delete(id)
    }
}
