import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Albums } from './entity/album.entity';
import { ArtistModule } from 'src/artist/artist.module';


@Module({
  imports: [
    ArtistModule
    , TypeOrmModule.forFeature([Albums])
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService]
})
export class AlbumModule { }
