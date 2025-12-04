import { IsEmail, IsString, MinLength, Matches, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'verification_code must be exactly 6 digits' })
  @Matches(/^\d{6}$/, { message: 'verification_code must be 6 digits' })
  verification_code: string;

  @IsString()
  @MinLength(6)
  password: string;
}

