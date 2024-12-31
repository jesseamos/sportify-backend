import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entity/user.entity';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { Artist } from './artist/entity/artist.entity';
import { Albums } from './album/entity/album.entity';
import { Track } from './track/entity/track.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { Playlist } from './playlist/entity/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Artist, Albums, Track, Playlist],
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    PlaylistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
