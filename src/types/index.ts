export interface GroceryItem {
  id: string;
  title: string;
  amount: number | null;
  bought: boolean;
  createdAt: string;
}

export interface CreateGroceryItem {
  title: string;
  amount: number;
}

export interface UpdateGroceryItem {
  id: string;
  title?: string;
  amount?: number;
  bought?: boolean;
}
