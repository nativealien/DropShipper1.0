import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVariantDto {
  @IsOptional()
  @IsString()
  vid?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  standard?: string;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsNumber()
  buy_price?: number;

  @IsOptional()
  @IsNumber()
  suggested_price?: number;

  @IsOptional()
  @IsNumber()
  margin_percent?: number;

  @IsOptional()
  @IsNumber()
  sell_price?: number;
}


