"use client";

import { useRef, useCallback } from "react";

export const useDownloadOneClick = () => {
  const downloadRef = useRef<HTMLDivElement>(null);

  const download = useCallback(() => {
    if (!downloadRef.current) return;

    // Serialize the component HTML
    const html = `
      <html>
        <head>
          <title>Download</title>
          <style>
            body { margin: 0; padding: 20px; font-family: sans-serif; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${downloadRef.current.outerHTML}
        </body>
      </html>
    `;

    // Create a blob
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Create a hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    iframe.src = url;

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print(); // triggers PDF download
      setTimeout(() => {
        document.body.removeChild(iframe);
        URL.revokeObjectURL(url);
      }, 1000);
    };
  }, []);

  return { downloadRef, download };
};
