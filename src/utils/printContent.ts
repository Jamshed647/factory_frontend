interface PrintOptions {
  title?: string;
  styles?: string;
  width?: string;
}

export const printContent = (htmlContent: string, options?: PrintOptions) => {
  const { title = "Print", styles = "", width } = options || {};

  const printWindow = window.open("", "_blank", "width=800,height=600");
  if (!printWindow) return;

  const defaultStyles = `
    body { margin: 0; font-family: Arial, sans-serif; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
    ${width ? `@media print { body { width: ${width}; } }` : ""}
  `;

  // ✅ Avoid deprecated document.write
  printWindow.document.open();
  printWindow.document.title = title;
  printWindow.document.head.innerHTML = `<style>${defaultStyles}${styles}</style>`;
  printWindow.document.body.innerHTML = htmlContent;
  printWindow.document.close();

  printWindow.focus();
  printWindow.print();
  printWindow.close();
};
