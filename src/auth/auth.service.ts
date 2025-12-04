import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../routes/users/user.entity';
import { Role } from '../routes/users/role.enum';

interface VerificationCode {
  code: string;
  email: string;
  expiresAt: Date;
}

@Injectable()
export class AuthService {
  // In-memory storage for verification codes (in production, use Redis or database)
  private verificationCodes = new Map<string, VerificationCode>();

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { user_name: string; email: string; name?: string; password: string; role?: Role }) {
    // Check if user_name already exists
    const existingUserName = await this.usersRepo.findOne({ where: { user_name: data.user_name } });
    if (existingUserName) {
      throw new UnauthorizedException('User name already in use');
    }

    // Check if email already exists
    const existingEmail = await this.usersRepo.findOne({ where: { email: data.email } });
    if (existingEmail) {
      throw new UnauthorizedException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = this.usersRepo.create({
      user_name: data.user_name,
      email: data.email,
      name: data.name,
      passwordHash,
      role: data.role ?? Role.USER,
    });

    await this.usersRepo.save(user);

    // Return JWT directly if you want "auto-login on signup"
    return this.buildAuthResult(user);
  }

  async validateUser(user_name: string, password: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { user_name } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user_name: string, password: string) {
    const user = await this.validateUser(user_name, password);
    return this.buildAuthResult(user);
  }

  private buildAuthResult(user: User) {
    const payload = { sub: user.id, user_name: user.user_name, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  private generateVerificationCode(): string {
    // Generate 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if email exists or not for security
      // Still return a code for dummy implementation
      const code = this.generateVerificationCode();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      this.verificationCodes.set(email, { code, email, expiresAt });
      return { verification_code: code, message: 'If the email exists, a verification code has been sent' };
    }

    const code = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store verification code (in production, use Redis or database)
    this.verificationCodes.set(email, { code, email, expiresAt });

    // TODO: Send email with verification code
    // For now, return the code in the response (dummy implementation)
    return {
      verification_code: code,
      message: 'Verification code has been sent to your email (dummy: returned in response)',
    };
  }

  async resetPassword(email: string, verification_code: string, newPassword: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check verification code
    const stored = this.verificationCodes.get(email);
    if (!stored) {
      throw new BadRequestException('No verification code found. Please request a new one.');
    }

    if (stored.code !== verification_code) {
      throw new BadRequestException('Invalid verification code');
    }

    if (new Date() > stored.expiresAt) {
      this.verificationCodes.delete(email);
      throw new BadRequestException('Verification code has expired. Please request a new one.');
    }

    // Update password and updatedAt will be automatically updated by UpdateDateColumn
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    await this.usersRepo.save(user);

    // Remove used verification code
    this.verificationCodes.delete(email);

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}

