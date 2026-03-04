// hooks/usePrint.ts
import { useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";

export type PrintSize = "A4" | "POS_80";

export const usePrint = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  // POS 80mm print handler with aggressive margin removal
  const handlePosPrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "receipt",
    pageStyle: `
      /* Remove ALL browser default margins */
      @page { 
        size: 80mm auto; 
        margin: 0 !important;
        padding: 0 !important;
      }
      
      @media print {
        /* Reset everything */
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          width: 80mm !important;
          min-height: 0 !important;
          height: auto !important;
          background: white !important;
        }
        
        /* Remove any body spacing */
        body {
          display: block !important;
          position: relative !important;
          top: 0 !important;
          left: 0 !important;
        }
        
        /* Target the receipt directly */
        .pos-80-receipt {
          width: 72mm !important;
          margin: 0 auto !important;
          padding: 1mm !important;
          background: white !important;
          font-family: 'Courier New', monospace !important;
          font-size: 10px !important;
          line-height: 1.2 !important;
          position: relative !important;
          top: 0 !important;
          left: 0 !important;
        }
        
        /* Remove any extra spacing from elements */
        .pos-80-receipt * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        /* Hide browser print headers/footers */
        @page {
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
        }
      }
    `,
    // Remove this line - copyStyles doesn't exist
    // copyStyles: true,
  });

  // A4 print handler
  const handleA4Print = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "invoice",
    pageStyle: `
      @page { 
        size: A4; 
        margin: 15mm; 
      }
      
      @media print {
        html, body {
          margin: 0;
          padding: 0;
          background: white;
        }
        
        .a4-invoice {
          width: 100%;
          max-width: 180mm;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  const printWithSize = useCallback(
    (size: PrintSize) => {
      if (size === "A4") {
        handleA4Print();
      } else {
        // Add extra style to force no margins
        const style = document.createElement("style");
        style.id = "pos-print-style";
        style.innerHTML = `
          @media print {
            @page { margin: 0 !important; }
            body { margin: 0 !important; padding: 0 !important; }
            
            /* Hide browser header/footer */
            #header, #footer, .header, .footer {
              display: none !important;
            }
          }
        `;
        document.head.appendChild(style);

        // Small delay to ensure styles are applied
        setTimeout(() => {
          handlePosPrint();
        }, 50);

        // Clean up after print
        setTimeout(() => {
          const styleTag = document.getElementById("pos-print-style");
          if (styleTag) {
            document.head.removeChild(styleTag);
          }
        }, 1000);
      }
    },
    [handleA4Print, handlePosPrint],
  );

  return {
    componentRef,
    printWithSize,
  };
};
