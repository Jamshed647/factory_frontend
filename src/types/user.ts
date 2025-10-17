export type UserRole = "ADMIN" | "MANAGER" | "USER";

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  photo?: string;
  status: "ACTIVE" | "INACTIVE";
  roles?: UserRole[];
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}
