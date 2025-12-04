import { IsOptional, IsString } from 'class-validator';

export class CreateStorefrontDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}


