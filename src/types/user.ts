export type UserRole =
  | "PROJECT_OWNER"
  | "COMPANY_OWNER"
  | "MANAGER"
  | "EMPLOYEE"
  | "SALESMAN";

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  photo?: string;
  status: "ACTIVE" | "INACTIVE";
  role?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}
