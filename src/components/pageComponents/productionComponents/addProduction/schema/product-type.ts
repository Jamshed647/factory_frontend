export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  quantityType: string;
  sellPrice: number;
  buyPrice: number;
  totalPrice?: number;
};

export type SelectedProduct = {
  productId: string;
  limit: number;
  buyPrice: number;
  totalPrice: number;
};
