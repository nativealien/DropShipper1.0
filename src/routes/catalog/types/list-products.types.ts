/**
 * TypeScript types for CJ API listProductsV2 parameters
 * Reference types for easy use in your codebase
 */

/**
 * Complete parameter interface for CJ API v1/product/listV2
 */
export interface CjListProductsV2Params {
  /** Search keyword - Product name or SKU keyword search */
  keyWord?: string;

  /** Page number - Default 1, minimum 1, maximum 1000 */
  page?: number;

  /** Quantity of results on each page - Default 10, minimum 1, maximum 100 */
  size?: number;

  /** Category ID - Filter products by third level category ID */
  categoryId?: string;

  /** Second level category ID list - Filter products by second level category ID list */
  lv2categoryList?: string[];

  /** Third level category ID list - Filter products by third level category ID list */
  lv3categoryList?: string[];

  /** Country code - Format: CN,US,GB,FR etc., filter products with inventory in specified countries */
  countryCode?: string;

  /** Start sell price - Price filter start value */
  startSellPrice?: number;

  /** End sell price - Price filter end value */
  endSellPrice?: number;

  /** Is free shipping - 0-not free shipping, 1-free shipping */
  addMarkStatus?: 0 | 1;

  /** Product type - 4-Supplier product, 10-Video product, 11-Non-video product */
  productType?: 4 | 10 | 11;

  /** Product flag - 0-Trending products, 1-New products, 2-Video products, 3-Slow-moving products */
  productFlag?: 0 | 1 | 2 | 3;

  /** Start warehouse inventory - Filter products with inventory greater than or equal to this value */
  startWarehouseInventory?: number;

  /** End warehouse inventory - Filter products with inventory less than or equal to this value */
  endWarehouseInventory?: number;

  /** Verified warehouse type - null/0-All(default), 1-Verified inventory, 2-Unverified inventory */
  verifiedWarehouse?: 0 | 1 | 2;

  /** Listing time filter start - Listing start time timestamp (milliseconds) */
  timeStart?: number;

  /** Listing time filter end - Listing end time timestamp (milliseconds) */
  timeEnd?: number;

  /** Zone platform suggestion - Such as: shopify,ebay,amazon,tiktok,etsy etc. */
  zonePlatform?: string;

  /** Is global warehouse search - true-yes, false-no */
  isWarehouse?: boolean;

  /** Currency - Such as: USD,AUD,EUR etc. */
  currency?: string;

  /** Sort direction - desc-descending(default) / asc-ascending */
  sort?: 'desc' | 'asc';

  /** Sort field - 0=best match(default); 1=listing count; 2=sell price; 3=create time; 4=inventory */
  orderBy?: 0 | 1 | 2 | 3 | 4;

  /** Features list - Supported values: enable_description(return product details), enable_category(return product category information), enable_combine(return combine product info), enable_video(return video IDs) */
  features?: Array<
    | 'enable_description'
    | 'enable_category'
    | 'enable_combine'
    | 'enable_video'
  >;

  /** Supplier ID - Filter products by supplier ID */
  supplierId?: string;

  /** Has certification - 0-No, 1-Yes */
  hasCertification?: 0 | 1;

  /** Is self pickup - 0-No, 1-Yes */
  isSelfPickup?: 0 | 1;

  /** Is customization product - 0-No, 1-Yes */
  customization?: 0 | 1;
}

/**
 * Enum for product type values
 */
export enum CjProductType {
  SUPPLIER = 4,
  VIDEO = 10,
  NON_VIDEO = 11,
}

/**
 * Enum for product flag values
 */
export enum CjProductFlag {
  TRENDING = 0,
  NEW = 1,
  VIDEO = 2,
  SLOW_MOVING = 3,
}

/**
 * Enum for verified warehouse types
 */
export enum CjVerifiedWarehouse {
  ALL = 0,
  VERIFIED = 1,
  UNVERIFIED = 2,
}

/**
 * Enum for sort order
 */
export enum CjSortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

/**
 * Enum for order by fields
 */
export enum CjOrderBy {
  BEST_MATCH = 0,
  LISTING_COUNT = 1,
  SELL_PRICE = 2,
  CREATE_TIME = 3,
  INVENTORY = 4,
}

/**
 * Enum for feature flags
 */
export enum CjFeature {
  ENABLE_DESCRIPTION = 'enable_description',
  ENABLE_CATEGORY = 'enable_category',
  ENABLE_COMBINE = 'enable_combine',
  ENABLE_VIDEO = 'enable_video',
}

/**
 * Enum for boolean-like values (0/1)
 */
export enum CjBoolean {
  NO = 0,
  YES = 1,
}

/**
 * Enum for shipping status
 */
export enum CjShippingStatus {
  NOT_FREE = 0,
  FREE = 1,
}

