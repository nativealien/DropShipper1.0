// users.controller.ts
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../../auth/auth.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { Role } from './role.enum';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body()
    body: RegisterUserDto,
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.user_name, body.password);
  }

  @Post('password-reset/request')
  requestPasswordReset(@Body() body: RequestPasswordResetDto) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Post('password-reset/reset')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.email, body.verification_code, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    // With stateless JWT, logout is handled client-side by deleting the token.
    // This endpoint exists mainly so clients have a URL to call.
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}


