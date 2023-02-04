export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          city: string | null;
          companyId: string | null;
          country: string | null;
          id: string;
          street: string | null;
          zipCode: string | null;
        };
        Insert: {
          city?: string | null;
          companyId?: string | null;
          country?: string | null;
          id: string;
          street?: string | null;
          zipCode?: string | null;
        };
        Update: {
          city?: string | null;
          companyId?: string | null;
          country?: string | null;
          id?: string;
          street?: string | null;
          zipCode?: string | null;
        };
      };
      companies: {
        Row: {
          addressId: string | null;
          createdAt: string | null;
          id: string;
          name: string | null;
          updatedAt: string | null;
          vat: string | null;
        };
        Insert: {
          addressId?: string | null;
          createdAt?: string | null;
          id: string;
          name?: string | null;
          updatedAt?: string | null;
          vat?: string | null;
        };
        Update: {
          addressId?: string | null;
          createdAt?: string | null;
          id?: string;
          name?: string | null;
          updatedAt?: string | null;
          vat?: string | null;
        };
      };
      inventories: {
        Row: {
          color: string | null;
          companyId: string | null;
          createdAt: string | null;
          id: string;
          isDefaultInventory: boolean | null;
          isPublic: boolean | null;
          name: string | null;
        };
        Insert: {
          color?: string | null;
          companyId?: string | null;
          createdAt?: string | null;
          id: string;
          isDefaultInventory?: boolean | null;
          isPublic?: boolean | null;
          name?: string | null;
        };
        Update: {
          color?: string | null;
          companyId?: string | null;
          createdAt?: string | null;
          id?: string;
          isDefaultInventory?: boolean | null;
          isPublic?: boolean | null;
          name?: string | null;
        };
      };
      products: {
        Row: {
          buyingPrice: number | null;
          categoryId: string | null;
          condition: string | null;
          createdAt: string | null;
          description: string | null;
          id: string;
          inventoryId: string | null;
          isPublic: boolean | null;
          label: string | null;
          madeIn: string | null;
          optimumQuantity: number | null;
          photoLink: string | null;
          publicDisponibility: string | null;
          quantityInInventory: number | null;
          sellingPrice: number | null;
          subCategoryId: string | null;
          toBuy: number | null;
          tva: number | null;
        };
        Insert: {
          buyingPrice?: number | null;
          categoryId?: string | null;
          condition?: string | null;
          createdAt?: string | null;
          description?: string | null;
          id: string;
          inventoryId?: string | null;
          isPublic?: boolean | null;
          label?: string | null;
          madeIn?: string | null;
          optimumQuantity?: number | null;
          photoLink?: string | null;
          publicDisponibility?: string | null;
          quantityInInventory?: number | null;
          sellingPrice?: number | null;
          subCategoryId?: string | null;
          toBuy?: number | null;
          tva?: number | null;
        };
        Update: {
          buyingPrice?: number | null;
          categoryId?: string | null;
          condition?: string | null;
          createdAt?: string | null;
          description?: string | null;
          id?: string;
          inventoryId?: string | null;
          isPublic?: boolean | null;
          label?: string | null;
          madeIn?: string | null;
          optimumQuantity?: number | null;
          photoLink?: string | null;
          publicDisponibility?: string | null;
          quantityInInventory?: number | null;
          sellingPrice?: number | null;
          subCategoryId?: string | null;
          toBuy?: number | null;
          tva?: number | null;
        };
      };
      profiles: {
        Row: {
          avatarUrl: string | null;
          companyId: string | null;
          email: string | null;
          firstName: string | null;
          hasInventoryManagementServiceActivated: boolean | null;
          hasSeenFirstConnectionModal: boolean | null;
          id: string;
          lastName: string | null;
          locale: string | null;
          phone: string | null;
          role: string | null;
          updatedAt: string | null;
          username: string | null;
        };
        Insert: {
          avatarUrl?: string | null;
          companyId?: string | null;
          email?: string | null;
          firstName?: string | null;
          hasInventoryManagementServiceActivated?: boolean | null;
          hasSeenFirstConnectionModal?: boolean | null;
          id: string;
          lastName?: string | null;
          locale?: string | null;
          phone?: string | null;
          role?: string | null;
          updatedAt?: string | null;
          username?: string | null;
        };
        Update: {
          avatarUrl?: string | null;
          companyId?: string | null;
          email?: string | null;
          firstName?: string | null;
          hasInventoryManagementServiceActivated?: boolean | null;
          hasSeenFirstConnectionModal?: boolean | null;
          id?: string;
          lastName?: string | null;
          locale?: string | null;
          phone?: string | null;
          role?: string | null;
          updatedAt?: string | null;
          username?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
