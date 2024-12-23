import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../auth/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>,) { }
    findUserByEmail(email: string) {
        return this.repo.find({ where: { email } })
    }

    createUser(user_name: string, email: string, password: string) {
        const user = this.repo.create({ user_name, email, password })
        return this.repo.save(user)
    }

    async fetchUser(id: string) {
        const user = await this.repo.findBy({ id: parseInt(id) })
        if (!user) {
            throw new NotFoundException(`can't find a user with id: ${id}`)
        }
        return user
    }

    async updateUser(id: number, body: UpdateUserDto) {
        const user = await this.repo.findOneBy({ id: id })
        if (!user) {
            throw new NotFoundException(`can't find a user with id: ${id}`)
        }


        this.repo.update(id, body)
        return user
    }
}
