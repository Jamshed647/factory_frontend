import { create } from "zustand";
import { devtools } from "zustand/middleware";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InvoiceStore {
  invoiceNo: string;
  date: string;
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

  items: any[];

  setAll: (payload: Partial<InvoiceStore>) => void;
  reset: () => void;
}

const initialState = {
  invoiceNo: "",
  date: "",
  bankId: "",
  factoryId: "",
  totalSaleAmount: 0,
  paidAmount: 0,
  preDueAmount: 0,
  currentDueAmount: 0,
  extraCharge: 0,
  discountType: "",
  discountPercentage: null,
  discountAmount: 0,
  totalAmount: 0,
  paymentMethod: "",
  note: null,
  sellerId: "",
  sellerName: "",
  items: [],
};

const useSellInvoiceStore = create<InvoiceStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setAll: (payload) =>
        set((state) => ({
          ...state,
          ...payload,
        })),

      reset: () => set(initialState),
    }),
    { name: "sell-invoice-store" },
  ),
);

export default useSellInvoiceStore;
