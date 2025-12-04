/**
 * TypeScript interfaces for all API endpoints
 * Request and Response types for frontend consumption
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum DropshippingProvider {
  CJ = 'cj',
}

// ============================================================================
// USERS API
// ============================================================================

// Request Types
export interface RegisterUserRequest {
  email: string;
  name?: string;
  password: string;
  role?: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Response Types
export interface User {
  id: number;
  email: string;
  name?: string;
  role: Role;
  createdAt: Date;
  storefronts?: Storefront[];
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name?: string;
    role: Role;
  };
}

export interface LogoutResponse {
  success: boolean;
}

// ============================================================================
// STOREFRONTS API
// ============================================================================

// Request Types
export interface CreateStorefrontRequest {
  title: string;
  description?: string;
}

export interface UpdateStorefrontRequest {
  title?: string;
  description?: string;
}

export interface AddProductsRequest {
  productIds: number[];
}

// Response Types
export interface Storefront {
  id: number;
  title: string;
  description?: string;
  owner?: User;
  products?: Product[];
}

export interface RemoveStorefrontResponse {
  success: boolean;
}

// ============================================================================
// PRODUCTS API
// ============================================================================

// Request Types
export interface CreateVariantRequest {
  vid?: string;
  sku?: string;
  name?: string;
  key?: string;
  standard?: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  image_url?: string;
  buy_price?: number;
  suggested_price?: number;
  margin_percent?: number;
  sell_price?: number;
}

export interface CreateProductRequest {
  provider: string;
  pid?: string;
  sku?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  imageSet?: any;
  variants?: CreateVariantRequest[];
  storefrontIds?: number[];
}

export interface UpdateProductRequest {
  provider?: string;
  pid?: string;
  sku?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  imageSet?: any;
}

export interface UpdateVariantRequest {
  vid?: string;
  sku?: string;
  name?: string;
  key?: string;
  standard?: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  image_url?: string;
  buy_price?: number;
  suggested_price?: number;
  margin_percent?: number;
  sell_price?: number;
}

// Response Types
export interface Variant {
  id: number;
  vid?: string;
  sku?: string;
  name?: string;
  key?: string;
  standard?: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  image_url?: string;
  buy_price?: number;
  suggested_price?: number;
  margin_percent?: number;
  sell_price?: number;
  created_at: Date;
  product?: Product;
}

export interface Product {
  id: number;
  provider: string;
  pid?: string;
  sku?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  imageSet?: any;
  storefronts?: Storefront[];
  variants?: Variant[];
}

export interface RemoveProductResponse {
  success: boolean;
}

export interface RemoveVariantResponse {
  success: boolean;
}

// ============================================================================
// CATALOG API
// ============================================================================

// Request Types (Query Parameters)
export interface ListProductsQuery {
  keyWord?: string;
  categoryId?: string;
  lv2categoryList?: string[];
  lv3categoryList?: string[];
  countryCode?: string;
  page?: number;
  size?: number;
  startSellPrice?: number;
  endSellPrice?: number;
  addMarkStatus?: 0 | 1; // 0-not free shipping, 1-free shipping
  productType?: 4 | 10 | 11; // 4-Supplier product, 10-Video product, 11-Non-video product
  productFlag?: 0 | 1 | 2 | 3; // 0-Trending, 1-New, 2-Video, 3-Slow-moving
  startWarehouseInventory?: number;
  endWarehouseInventory?: number;
  verifiedWarehouse?: 0 | 1 | 2; // null/0-All(default), 1-Verified, 2-Unverified
  timeStart?: number; // Timestamp in milliseconds
  timeEnd?: number; // Timestamp in milliseconds
  zonePlatform?: string; // e.g., shopify, ebay, amazon, tiktok, etsy
  isWarehouse?: boolean;
  currency?: string; // e.g., USD, AUD, EUR
  sort?: 'desc' | 'asc';
  orderBy?: 0 | 1 | 2 | 3 | 4; // 0=best match(default); 1=listing count; 2=sell price; 3=create time; 4=inventory
  features?: string[]; // enable_description, enable_category, enable_combine, enable_video
  supplierId?: string;
  hasCertification?: 0 | 1; // 0-No, 1-Yes
  isSelfPickup?: 0 | 1; // 0-No, 1-Yes
  customization?: 0 | 1; // 0-No, 1-Yes
}

export interface ListCategoriesQuery {
  // Currently empty, but can be extended
}

// Response Types
export interface Provider {
  id: DropshippingProvider;
  name: string;
}

export interface Category {
  // Structure depends on your categorys.ts file
  [key: string]: any;
}

export interface CatalogProduct {
  // Structure depends on CJ API response
  [key: string]: any;
}

export interface CatalogProductListResponse {
  // Structure depends on CJ API response
  content?: CatalogProduct[];
  totalElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
  [key: string]: any;
}

export interface CatalogProductDetail {
  // Structure depends on CJ API response
  [key: string]: any;
}

// ============================================================================
// API ERROR RESPONSE
// ============================================================================

export interface ApiErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

// ============================================================================
// ENDPOINT TYPE MAPPINGS (for reference)
// ============================================================================

/**
 * USERS ENDPOINTS:
 * 
 * POST   /users/register          -> RegisterUserRequest -> AuthResponse
 * POST   /users/login              -> LoginRequest -> AuthResponse
 * POST   /users/logout             -> (no body) -> LogoutResponse
 * GET    /users/me                 -> (no body) -> User
 * GET    /users                    -> (no body) -> User[]
 * 
 * STOREFRONTS ENDPOINTS:
 * 
 * POST   /storefronts              -> CreateStorefrontRequest -> Storefront
 * GET    /storefronts               -> (no body) -> Storefront[]
 * GET    /storefronts/me           -> (no body) -> Storefront[]
 * GET    /storefronts/:id          -> (no body) -> Storefront
 * PATCH  /storefronts/:id          -> UpdateStorefrontRequest -> Storefront
 * DELETE /storefronts/:id          -> (no body) -> RemoveStorefrontResponse
 * GET    /storefronts/:id/products -> (no body) -> Product[]
 * POST   /storefronts/:id/products -> AddProductsRequest -> Storefront
 * DELETE /storefronts/:id/products/:productId -> (no body) -> Storefront
 * 
 * PRODUCTS ENDPOINTS:
 * 
 * POST   /products                 -> CreateProductRequest -> Product
 * GET    /products                 -> (no body) -> Product[]
 * GET    /products/:id             -> (no body) -> Product
 * PATCH  /products/:id             -> UpdateProductRequest -> Product
 * DELETE /products/:id              -> (no body) -> RemoveProductResponse
 * GET    /products/:productId/variants -> (no body) -> Variant[]
 * POST   /products/:productId/variants -> CreateVariantRequest -> Variant
 * PATCH  /products/:productId/variants/:variantId -> UpdateVariantRequest -> Variant
 * DELETE /products/:productId/variants/:variantId -> (no body) -> RemoveVariantResponse
 * 
 * CATALOG ENDPOINTS:
 * 
 * GET    /catalog/providers        -> (no body) -> Provider[]
 * GET    /catalog/:provider/categories -> ListCategoriesQuery -> Category[]
 * GET    /catalog/:provider/products -> ListProductsQuery -> CatalogProductListResponse
 * GET    /catalog/:provider/products/:externalId -> (no body) -> CatalogProductDetail
 */

