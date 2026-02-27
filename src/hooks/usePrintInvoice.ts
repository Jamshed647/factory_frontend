// hooks/usePrintInvoice.ts
import { useRef } from "react";
import { printContent } from "../utils/printContent";

export const usePrintInvoice = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const print = (options?: {
    title?: string;
    styles?: string;
    width?: string;
  }) => {
    if (!printRef.current) return;
    printContent(printRef.current.innerHTML, options);
  };

  return { printRef, print };
};
