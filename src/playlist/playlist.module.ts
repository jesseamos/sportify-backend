import { forwardRef, Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { UsersModule } from 'src/users/users.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    UsersModule,
    TrackModule
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController],
  exports: [PlaylistService]
})
export class PlaylistModule { }
