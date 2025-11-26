import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CjRelatedCategoryDto {
  @IsString()
  categoryId!: string; // Related category ID

  @IsString()
  categoryName!: string; // Related category name
}

class CjStoreDto {
  @IsString()
  warehouseId!: string; // Warehouse ID

  @IsString()
  warehouseName!: string; // Warehouse name

  @IsString()
  countryCode!: string; // Warehouse country code
}

class CjProductDto {
  @IsString()
  id!: string; // Unique product identifier

  @IsString()
  nameEn!: string; // Product English name

  @IsString()
  sku!: string; // Product SKU code

  @IsString()
  spu!: string; // Product SPU code, same as SKU

  @IsString()
  bigImage!: string; // Product main image URL

  @IsString()
  sellPrice!: string; // Product sell price, unit: USD

  @IsString()
  nowPrice!: string; // Product discount price

  @IsString()
  discountPrice!: string; // Best discount price

  @IsString()
  discountPriceRate!: string; // Discount percentage

  @IsInt()
  listedNum!: number; // Number of times this product is listed on the platform

  @IsInt()
  isCollect!: number; // 0-not collected, 1-collected

  @IsString()
  categoryId!: string; // Product third level category ID

  @IsString()
  threeCategoryName!: string; // Third level category name (returned only when features contains enable_category)

  @IsString()
  twoCategoryId!: string; // Product second level category ID

  @IsString()
  twoCategoryName!: string; // Second level category name (returned only when features contains enable_category)

  @IsString()
  oneCategoryId!: string; // Product first level category ID

  @IsString()
  oneCategoryName!: string; // First level category name (returned only when features contains enable_category)

  @IsInt()
  addMarkStatus!: number; // 0-not free shipping, 1-free shipping

  @IsInt()
  isVideo!: number; // 0-no video, 1-has video

  @IsArray()
  @IsString({ each: true })
  videoList!: string[]; // Product video ID collection (returned only when features contains enable_video)

  @IsString()
  productType!: string; // Product type code

  @IsOptional()
  @IsString()
  supplierName?: string; // Product supplier name

  @IsNumber()
  createAt!: number; // Product create timestamp (milliseconds)

  @IsOptional()
  @IsNumber()
  setRecommendedTime?: number; // Set recommended timestamp

  @IsInt()
  warehouseInventoryNum!: number; // Total inventory number

  @IsInt()
  totalVerifiedInventory!: number; // Total verified inventory

  @IsInt()
  totalUnVerifiedInventory!: number; // Total unverified inventory

  @IsInt()
  verifiedWarehouse!: number; // 1-Verified inventory, 2-Unverified inventory

  @IsInt()
  customization!: number; // 0-No, 1-Yes

  @IsInt()
  isPersonalized!: number; // 0-No, 1-Yes

  @IsInt()
  hasCECertification!: number; // 0-No, 1-Yes

  @IsBoolean()
  myProduct!: boolean; // true-added, false-not added

  @IsString()
  currency!: string; // Such as: USD, AUD, EUR etc.

  @IsString()
  description!: string; // Detailed product description (returned only when features contains enable_description)

  @IsString()
  deliveryCycle!: string; // Product delivery cycle in days

  @IsString()
  saleStatus!: string; // 3-approved for sale

  @IsString()
  authorityStatus!: string; // 0-private visible, 1-all visible

  @IsString()
  autStatus!: string; // Product visibility status

  @IsInt()
  isAut!: number; // 0-not permanent private, 1-permanent private

  @IsInt()
  isList!: number; // 0-not listed, 1-listed

  @IsString()
  syncListedProductStatus!: string; // 0-pending, 1-listing, 2-failed, 3-success, 4-cancelled

  @IsInt()
  isAd!: number; // 0-not ad, 1-ad product

  @IsOptional()
  @IsString()
  activityId?: string; // Advertisement activity ID

  @IsOptional()
  @IsString()
  directMinOrderNum?: string; // Minimum order quantity

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  zoneRecommendJson?: string[]; // Zone recommend tag collection

  @IsOptional()
  @IsString()
  inventoryInfo?: string; // Warehouse inventory details JSON

  @IsOptional()
  @IsString()
  variantKeyEn?: string; // Variant property English description

  @IsOptional()
  @IsString()
  variantInventories?: string; // Variant inventory details JSON

  @IsOptional()
  @IsString()
  propertyKey?: string; // Product logistics property keywords
}

class CjProductContentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CjProductDto)
  productList!: CjProductDto[]; // Product information array

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CjRelatedCategoryDto)
  relatedCategoryList!: CjRelatedCategoryDto[]; // Related categories matched by search keyword list

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CjStoreDto)
  storeList!: CjStoreDto[]; // Warehouse/store inventory list

  @IsString()
  keyWord!: string; // Actual search keyword used

  @IsOptional()
  @IsString()
  keyWordOld?: string; // Original search keyword entered by user

  @IsOptional()
  @IsString()
  searchHit?: string; // Search hit statistics
}

class CjProductsPageDto {
  @IsInt()
  pageSize!: number; // Number of products per page

  @IsInt()
  pageNumber!: number; // Current requested page number, starts from 1

  @IsInt()
  totalRecords!: number; // Total number of products matching criteria

  @IsInt()
  totalPages!: number; // Total pages

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CjProductContentDto)
  content!: CjProductContentDto[]; // Product data list
}

export class GetCjProductsResponseDto {
  @IsInt()
  code!: number; // Response code

  @IsBoolean()
  result!: boolean; // Success flag

  @IsString()
  message!: string; // Response message

  @ValidateNested()
  @Type(() => CjProductsPageDto)
  data!: CjProductsPageDto; // Pagination data

  @IsString()
  requestId!: string; // Request ID
}

