import { create } from "zustand";
import { devtools } from "zustand/middleware";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InvoiceStore {
  invoiceNo: string;
  items: any[];
  totalAmount: number;
  discountAmount: number;
  discountType: string;
  paidAmount: number;
  currentDueAmount: number;
  paymentMethod: string;
  bankId: string | null;
  note: string | null;

  setAll: (payload: Partial<InvoiceStore>) => void;
  reset: () => void;
}

const initialState = {
  invoiceNo: "",
  items: [],
  totalAmount: 0,
  discountAmount: 0,
  discountType: "",
  paidAmount: 0,
  currentDueAmount: 0,
  paymentMethod: "",
  bankId: null,
  note: null,
};

const usePurchaseInvoiceStore = create<InvoiceStore>()(
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
    { name: "invoice-store" },
  ),
);

export default usePurchaseInvoiceStore;
