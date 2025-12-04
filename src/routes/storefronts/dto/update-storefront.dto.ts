import { IsOptional, IsString } from 'class-validator';

export class UpdateStorefrontDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}


