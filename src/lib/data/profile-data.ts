export type UserRole =
  | "PROJECT_OWNER"
  | "COMPANY_OWNER"
  | "MANAGER"
  | "SALESMAN"
  | "EMPLOYEE";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  joinDate: string;
  lastLogin: string;
  status: "active" | "inactive";
  factoryId?: string;
  factoryName?: string;
  managedBy?: string;
  factories?: {
    id: string;
    name: string;
    role: string;
    status: "active" | "inactive";
    location: string;
  }[];
}

export const demoProfiles: Record<UserRole, UserProfile> = {
  PROJECT_OWNER: {
    id: "jangosoft-001",
    name: "JangoSoft Administrator",
    email: "admin@jangosoft.com",
    phone: "+8801700000001",
    role: "PROJECT_OWNER",
    joinDate: "2024-01-01",
    lastLogin: "2024-12-19T10:30:00Z",
    status: "active",
    factoryName: "All System Factories",
    factories: [
      {
        id: "all",
        name: "All Factories",
        role: "System Admin",
        status: "active",
        location: "Bangladesh Wide",
      },
    ],
  },
  COMPANY_OWNER: {
    id: "company-001",
    name: "Abdul Rahman",
    email: "rahman@murimaster.com",
    phone: "+8801712345678",
    role: "COMPANY_OWNER",
    joinDate: "2024-01-15",
    lastLogin: "2024-12-19T10:30:00Z",
    status: "active",
    factoryId: "company-1",
    factoryName: "Muri Master Company Ltd.",
    factories: [
      {
        id: "factory-1",
        name: "Muri Master - Dhaka",
        role: "Owner",
        status: "active",
        location: "Dhaka",
      },
      {
        id: "factory-2",
        name: "Muri Master - Chittagong",
        role: "Owner",
        status: "active",
        location: "Chittagong",
      },
      {
        id: "factory-3",
        name: "Muri Master - Rajshahi",
        role: "Owner",
        status: "inactive",
        location: "Rajshahi",
      },
    ],
  },
  MANAGER: {
    id: "manager-001",
    name: "Mohammad Ali",
    email: "ali@murimaster.com",
    phone: "+8801712345679",
    role: "MANAGER",
    joinDate: "2024-02-01",
    lastLogin: "2024-12-19T09:15:00Z",
    status: "active",
    factoryId: "factory-1",
    factoryName: "Muri Master - Dhaka",
    managedBy: "Abdul Rahman",
    factories: [
      {
        id: "factory-1",
        name: "Muri Master - Dhaka",
        role: "Factory Manager",
        status: "active",
        location: "Dhaka",
      },
    ],
  },
  SALESMAN: {
    id: "salesman-001",
    name: "Rahim Khan",
    email: "rahim@murimaster.com",
    phone: "+8801712345680",
    role: "SALESMAN",
    joinDate: "2024-03-01",
    lastLogin: "2024-12-19T08:45:00Z",
    status: "active",
    factoryId: "factory-1",
    factoryName: "Muri Master - Dhaka",
    managedBy: "Mohammad Ali",
    factories: [
      {
        id: "factory-1",
        name: "Muri Master - Dhaka",
        role: "Sales Executive",
        status: "active",
        location: "Dhaka",
      },
    ],
  },
  EMPLOYEE: {
    id: "employee-001",
    name: "Karim Uddin",
    email: "karim@murimaster.com",
    phone: "+8801712345681",
    role: "EMPLOYEE",
    joinDate: "2024-03-15",
    lastLogin: "2024-12-19T07:30:00Z",
    status: "active",
    factoryId: "factory-1",
    factoryName: "Muri Master - Dhaka",
    managedBy: "Mohammad Ali",
    factories: [
      {
        id: "factory-1",
        name: "Muri Master - Dhaka",
        role: "Production Worker",
        status: "active",
        location: "Dhaka",
      },
    ],
  },
};
