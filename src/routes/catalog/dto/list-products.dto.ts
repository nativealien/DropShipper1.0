import {
  IsOptional,
  IsString,
  IsInt,
  IsArray,
  IsNumber,
  IsBoolean,
  Min,
  Max,
  Length,
  IsIn,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

/**
 * DTO for listing products with all possible CJ API parameters
 * Based on CJ API v1/product/listV2 documentation
 */
export class ListProductsQueryDto {
  // Search & Filtering
  @IsOptional()
  @IsString()
  @Length(0, 200)
  keyWord?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  lv2categoryList?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  lv3categoryList?: string[];

  @IsOptional()
  @IsString()
  @Length(0, 200)
  countryCode?: string;

  // Pagination
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  size?: number = 10;

  // Price Filtering
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  startSellPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  endSellPrice?: number;

  // Shipping & Product Type
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  addMarkStatus?: number; // 0-not free shipping, 1-free shipping

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([4, 10, 11])
  productType?: number; // 4-Supplier product, 10-Video product, 11-Non-video product

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2, 3])
  productFlag?: number; // 0-Trending, 1-New, 2-Video, 3-Slow-moving

  // Inventory Filtering
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  startWarehouseInventory?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  endWarehouseInventory?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  verifiedWarehouse?: number; // null/0-All(default), 1-Verified, 2-Unverified

  // Time Filtering
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  timeStart?: number; // Timestamp in milliseconds

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  timeEnd?: number; // Timestamp in milliseconds

  // Platform & Warehouse
  @IsOptional()
  @IsString()
  @Length(0, 200)
  zonePlatform?: string; // e.g., shopify, ebay, amazon, tiktok, etsy

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isWarehouse?: boolean; // true-yes, false-no

  // Currency & Sorting
  @IsOptional()
  @IsString()
  @Length(0, 10)
  currency?: string; // e.g., USD, AUD, EUR

  @IsOptional()
  @IsString()
  @IsIn(['desc', 'asc'])
  sort?: string = 'desc'; // desc-descending(default) / asc-ascending

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2, 3, 4])
  orderBy?: number; // 0=best match(default); 1=listing count; 2=sell price; 3=create time; 4=inventory

  // Features
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  features?: string[]; // enable_description, enable_category, enable_combine, enable_video

  // Supplier & Certification
  @IsOptional()
  @IsString()
  @Length(0, 200)
  supplierId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  hasCertification?: number; // 0-No, 1-Yes

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  isSelfPickup?: number; // 0-No, 1-Yes

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  customization?: number; // 0-No, 1-Yes
}
