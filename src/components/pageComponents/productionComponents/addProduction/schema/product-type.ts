export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  quantityType: string;
  sellPrice: number;
  buyPrice: number;
  limit?: number;
  totalPrice?: number;
  productId?: string;
};

export type SelectedProduct = {
  name?: string;
  productId: string;
  limit: number;
  buyPrice: number;
  totalPrice: number;
};
