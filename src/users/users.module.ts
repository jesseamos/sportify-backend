import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constant/constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' }
    }),
    TypeOrmModule.forFeature([User])],
  providers: [
    UsersService
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
