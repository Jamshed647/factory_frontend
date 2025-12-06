/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/errorHandler.ts
import { clearToken } from "@/utils/cookie/tokenHandler";
import toast from "react-hot-toast";

export const handleApiError = (error: any, portalName?: string) => {
  const status = error?.response?.status;

  if (status === 401) {
    toast.error("Unauthorized. Redirecting to login...");
    // clearToken();
    window.location.href = `/login`;
    return;
  }

  if (status === 403) {
    toast.error("Access denied.");
    // clearToken();
    window.location.href = "/forbidden";
    return;
  }

  // toast.error(message);

  return false;
  // console.error("API error:", error);
};
