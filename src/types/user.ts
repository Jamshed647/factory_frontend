export type UserRole =
  | "PROJECT_OWNER"
  | "COMPANY_OWNER"
  | "MANAGER"
  | "EMPLOYEE"
  | "SALESMAN";

export interface User {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  photo?: string;
  factoryId?: string;
  companyOwnerId?: string;
  status: "ACTIVE" | "INACTIVE";
  role: UserRole;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
  factory?: {
    id?: string;
    name?: string;
    address?: string;
    status?: "ACTIVE" | "INACTIVE";
  };
}
