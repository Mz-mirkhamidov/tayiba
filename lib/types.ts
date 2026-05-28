export type CollectionSlug = "men" | "women" | "prayer" | "gift";

export interface Collection {
  slug: CollectionSlug;
  index: string;
  name: string;
  arabicName: string;
  subtitle: string;
  description: string;
  visual: string;
  cloudinaryId?: string;
}

export type MediaKind = "image" | "video" | "model3d";

export interface MediaItem {
  kind: MediaKind;
  cloudinaryId?: string;
  url?: string;
  swatch?: string;
  alt: string;
}

export interface ColorOption {
  id: string;
  name: string;
  arabicName?: string;
  hex: string;
  swatch: string;
  cloudinaryId?: string;
  stock: number;
}

export interface SizeOption {
  id: string;
  label: string;
  inStock: boolean;
}

export interface Model3D {
  url?: string;
  cloudinaryId?: string;
  alt?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  autoRotateSpeed?: number;
}

export interface Product {
  id: string;
  slug: string;
  collection: CollectionSlug;
  category: string;
  name: string;
  arabicName?: string;
  price: number;
  currency: "UZS" | "USD";
  originalPrice?: number;
  shortDescription: string;
  description: string;
  story?: string;
  composition: string[];
  care: string[];
  origin: string;
  colors: ColorOption[];
  sizes: SizeOption[];
  defaultColorId?: string;
  defaultSizeId?: string;
  swatch: string;
  cloudinaryId?: string;
  gallery: MediaItem[];
  model3d?: Model3D;
  isNew?: boolean;
  isLimited?: boolean;
  isBestSeller?: boolean;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  collection?: CollectionSlug;
  category?: string;
  isNew?: boolean;
  search?: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CartItem {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}
