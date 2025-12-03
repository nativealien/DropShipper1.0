// users.controller.ts
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../../auth/auth.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from './role.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body()
    body: { email: string; name?: string; password: string },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}


