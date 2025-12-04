export interface CjApiBaseResponse<T = any> {
    code?: number;
    result?: boolean;
    success?: boolean;
    message?: string | null;
    data?: T;
    requestId?: string;
  }
  
  export interface CjTokenData {
    openId: number;
    accessToken: string;
    accessTokenExpiryDate: string;
    refreshToken: string;
    refreshTokenExpiryDate: string;
    createDate: string;
  }
  
  export interface CjPaginated<T> {
    pageNum: number;
    pageSize: number;
    total: number;
    list: T[];
  }

  /**
   * Response structure for CJ API v1/product/listV2
   */
  export interface CjListProductsV2Content<T = any> {
    productList: T[];
    relatedCategoryList: any[];
    keyWord: string;
    keyWordOld: string;
  }

  export interface CjListProductsV2Data<T = any> {
    pageSize: number;
    pageNumber: number;
    totalRecords: number;
    totalPages: number;
    content: CjListProductsV2Content<T>[];
  }

  /**
   * Product object structure from CJ API v1/product/listV2
   */
  export interface CjProduct {
    id: string;
    nameEn: string;
    sku: string;
    isCollect: number;
    listedNum: number;
    bigImage: string;
    sellPrice: string; // e.g., "0.60 -- 5.25"
    nowPrice: string;
    authorityStatus: string;
    addMarkStatus: number; // 0-not free shipping, 1-free shipping
    isVedio: number;
    productType: string;
    isAut: string;
    categoryId: string;
    threeCategoryName: string | null;
    twoCategoryId: string | null;
    twoCategoryName: string | null;
    oneCategoryId: string | null;
    oneCategoryName: string | null;
    directMinOrderNum: number | null;
    supplierName: string | null;
    zoneRecommendJson: any | null;
    createAt: string | null;
    setRecommendedTime: string | null;
    autStatus: string;
    isList: number;
    isAd: number;
    activityId: string | null;
    isPersonalized: number;
    saleStatus: string | null;
    syncListedProductStatus: string | null;
    videoList: any[];
    deliveryCycle: string | null;
    warehouseInventoryNum: number;
    discountPrice: string | null;
    discountPriceRate: string | null;
    myProduct: boolean;
    currency: string | null;
    totalVerifiedInventory: number | null;
    totalUnVerifiedInventory: number | null;
    verifiedWarehouse: number;
    customization: number | null;
    hasCECertification: number | null;
    description: string | null;
    spu: string | null;
    inventoryInfo: any | null;
    variantKeyEn: string | null;
    variantInventories: any | null;
    propertyKey: string | null;
    isVideo: number;
  }

  /**
   * Product detail structure from CJ API v1/product/query
   */
  export interface CjProductVariantDetail {
    vid: string;
    pid: string;
    variantName: string | null;
    variantNameEn: string | null;
    variantImage: string;
    variantSku: string;
    variantUnit: string;
    variantProperty: string; // often JSON string "[]"
    variantKey: string;
    variantLength: number;
    variantWidth: number;
    variantHeight: number;
    variantVolume: number;
    variantWeight: number;
    variantSellPrice: number;
    createTime: number; // timestamp (ms)
    variantStandard: string;
    variantSugSellPrice: number;
    combineNum: number | null;
    inventoryNum: number | null;
    combineVariants: any | null;
  }

  export interface CjProductDetail {
    pid: string;
    productName: string; // JSON string array
    productNameSet: string[];
    productNameEn: string;
    productSku: string;
    productImage: string; // JSON string array
    productImageSet: string[];
    productWeight: string;
    productUnit: string | null;
    productType: string;
    categoryId: string;
    categoryName: string;
    entryCode: string;
    entryName: string;
    entryNameEn: string;
    materialName: string; // JSON string array
    materialNameSet: string[];
    materialNameEn: string; // JSON string array
    materialNameEnSet: string[];
    materialKey: string; // JSON string array
    materialKeySet: string[];
    packingWeight: string;
    packingName: string; // JSON string array
    packingNameSet: string[];
    packingNameEn: string; // JSON string array
    packingNameEnSet: string[];
    packingKey: string; // JSON string array
    packingKeySet: string[];
    productKey: string; // JSON string array
    productKeySet: string[];
    productKeyEn: string;
    productPro: string; // JSON string array
    productProSet: string[];
    productProEn: string; // JSON string array
    productProEnSet: string[];
    sellPrice: string;
    sourceFrom: number;
    description: string;
    variants: CjProductVariantDetail[];
    addMarkStatus: number;
    createrTime: string;
    productVideo: string | null;
    status: string;
    suggestSellPrice: string;
    listedNum: number;
    supplierName: string | null;
    supplierId: string | null;
    customizationVersion: string | null;
    customizationJson1: string | null;
    customizationJson2: string | null;
    customizationJson3: string | null;
    customizationJson4: string | null;
    isTestProduct: boolean;
  }
  