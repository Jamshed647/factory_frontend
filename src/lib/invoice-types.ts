export interface InvoiceItem {
  id: string;
  productId: string;
  quantity: number;
  sellPrice: number;
  updateSellPrice: number;
  buyPrice: number;
  totalPrice: number;
  createdAt: string;
  productName?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalDueAmount: number;
  status: string;
  factoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  type: string;
  date: string;
  customerId: string;
  factoryId: string;
  totalSaleAmount: number;
  paidAmount: number;
  preDueAmount: number;
  currentDueAmount: number;
  extraCharge: number;
  discountType: string;
  discountPercentage: number | null;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: string;
  note: string | null;
  bankId: string | null;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  items: InvoiceItem[];
  bank: {
    id: string;
    name: string;
    address: string;
  };
}
