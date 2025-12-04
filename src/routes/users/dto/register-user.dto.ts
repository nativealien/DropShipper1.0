import { IsEmail, IsEnum, IsOptional, IsString, MinLength, Matches } from 'class-validator';
import { Role } from '../role.enum';

export class RegisterUserDto {
  @IsString()
  @Matches(/^[^\s]+$/, { message: 'user_name must not contain spaces' })
  user_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}


