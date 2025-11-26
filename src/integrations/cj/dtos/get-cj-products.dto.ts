import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const FEATURE_FLAGS = [
  'enable_description',
  'enable_category',
  'enable_combine',
  'enable_video',
] as const;

type FeatureFlag = (typeof FEATURE_FLAGS)[number];

export class GetCjProductsDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  keyWord?: string; // Search keyword (product name or SKU)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  page = 1; // Page number (1-1000, default 1)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  size = 10; // Items per page (1-100, default 10)

  @IsOptional()
  @IsString()
  @MaxLength(200)
  categoryId?: string; // Third level category ID

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  lv2categoryList?: string[]; // Second level category ID list

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  lv3categoryList?: string[]; // Third level category ID list

  @IsOptional()
  @IsString()
  @MaxLength(200)
  countryCode?: string; // Inventory country code (CN, US, etc.)

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  startSellPrice?: number; // Minimum sell price

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  endSellPrice?: number; // Maximum sell price

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1)
  addMarkStatus?: number; // Free shipping flag (0/1)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productType?: number; // Product type (4 supplier, 10 video, etc.)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productFlag?: number; // Product flag (0 trending, 1 new, etc.)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  startWarehouseInventory?: number; // Minimum warehouse inventory

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  endWarehouseInventory?: number; // Maximum warehouse inventory

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(2)
  verifiedWarehouse?: number; // Verified warehouse type (0-2)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  timeStart?: number; // Listing time start (ms timestamp)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  timeEnd?: number; // Listing time end (ms timestamp)

  @IsOptional()
  @IsString()
  @MaxLength(200)
  zonePlatform?: string; // Platform suggestion (Shopify, Amazon, etc.)

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isWarehouse?: boolean; // Global warehouse search (true/false)

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string; // Currency code (USD, EUR, etc.)

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc'; // Sort direction (asc/desc)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(4)
  orderBy?: number; // Sort field (0 best match, 1 listing count, etc.)

  @IsOptional()
  @IsArray()
  @IsIn(FEATURE_FLAGS, { each: true })
  features?: FeatureFlag[]; // Feature flags (description, category, etc.)

  @IsOptional()
  @IsString()
  @MaxLength(200)
  supplierId?: string; // Supplier ID filter

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1)
  hasCertification?: number; // Certification flag (0/1)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1)
  isSelfPickup?: number; // Self pickup flag (0/1)

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1)
  customization?: number; // Customization flag (0/1)
}

