import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findAll() {
    return this.repo.find();
  }

  create(data: { email: string; name?: string }) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}

