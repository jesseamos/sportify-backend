import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entity/track.entity';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    ArtistModule
    , AlbumModule
    , TypeOrmModule.forFeature([Track])
  ],
  controllers: [TrackController],
  providers: [TrackService]
})
export class TrackModule { }
