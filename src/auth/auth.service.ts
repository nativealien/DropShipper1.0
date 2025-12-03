import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../routes/users/user.entity';
import { Role } from '../routes/users/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { email: string; name?: string; password: string }) {
    const existing = await this.usersRepo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = this.usersRepo.create({
      email: data.email,
      name: data.name,
      passwordHash,
      role: Role.USER,
    });

    await this.usersRepo.save(user);

    // Return JWT directly if you want “auto-login on signup”
    return this.buildAuthResult(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.buildAuthResult(user);
  }

  private buildAuthResult(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}

