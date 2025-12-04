import { IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^[^\s]+$/, { message: 'user_name must not contain spaces' })
  user_name: string;

  @IsString()
  @MinLength(6)
  password: string;
}


