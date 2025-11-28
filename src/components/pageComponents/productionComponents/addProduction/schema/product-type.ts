export type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  quantityType: string;
  sellPrice: number;
  buyPrice: number;
  productionQuantity?: number;
  totalPrice?: number;
  productId?: string;
};

export type SelectedProduct = {
  name?: string;
  productId: string;
  productionQuantity: number;
  buyPrice: number;
  totalPrice: number;
};
