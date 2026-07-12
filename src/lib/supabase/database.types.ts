export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  gallery_images: string[];
  is_featured: boolean;
  is_active: boolean;
  stock: number;
  content: string | null;
  created_at: string;
  updated_at: string;
}

type ProductInsertShape = {
  id?: string;
  slug: string;
  name: string;
  description?: string | null;
  price?: number;
  category?: string | null;
  image_url?: string | null;
  gallery_images?: string[];
  is_featured?: boolean;
  is_active?: boolean;
  stock?: number;
  content?: string | null;
  created_at?: string;
  updated_at?: string;
}

type EventRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  image_url: string | null;
  is_active: boolean;
  discount: number | null;
  price: number;
  location: string | null;
  quota: number | null;
  terms: string[];
  content: string | null;
  created_at: string;
  updated_at: string;
}

type EventInsertShape = {
  id?: string;
  slug: string;
  title: string;
  description?: string | null;
  start_date: string;
  end_date: string;
  image_url?: string | null;
  is_active?: boolean;
  discount?: number | null;
  price?: number;
  location?: string | null;
  quota?: number | null;
  terms?: string[];
  content?: string | null;
  created_at?: string;
  updated_at?: string;
}

type AdminRow = {
  user_id: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductInsertShape;
        Update: Partial<ProductInsertShape>;
        Relationships: [];
      };
      events: {
        Row: EventRow;
        Insert: EventInsertShape;
        Update: Partial<EventInsertShape>;
        Relationships: [];
      };
      admins: {
        Row: AdminRow;
        Insert: { user_id: string; created_at?: string };
        Update: Partial<AdminRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
