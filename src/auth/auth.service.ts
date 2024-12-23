import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

const scrypt = promisify(_scrypt)
@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }
    async signup(user_name: string, email: string, password: string) {
        const emailExist = await this.userService.findUserByEmail(email)
        if (emailExist.length) {
            throw new BadRequestException("email already exist")
        }

        const salt = randomBytes(8).toString("hex")
        const hash = await (scrypt(password, salt, 32)) as Buffer
        const hashResult = salt + "." + hash.toString("hex")
        const user = this.userService.createUser(user_name, email, hashResult)
        return user
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.findUserByEmail(email)
        if (!user) {
            throw new NotFoundException("email doesn't exist")
        }
        const [salt, hashedPassword] = await user.password.split(".")
        const hash = await (scrypt(password, salt, 32)) as Buffer
        if (hash.toString("hex") != hashedPassword) {
            throw new BadRequestException()
        }
        const payload = { sub: user.id, username: user.user_name, email: user.email }
        const token = { access_token: await this.jwtService.signAsync(payload) }
        return JSON.stringify(token)

    }
}


