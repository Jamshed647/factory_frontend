"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "PROJECT_OWNER" | "COMPANY_OWNER" | "MANAGER" | "EMPLOYEE" | "SALESMAN";
  avatar?: string;
  joinDate: string;
  lastLogin: string;
  status: "active" | "inactive";
  factories?: {
    id: string;
    name: string;
    role: string;
    status: "active" | "inactive";
  }[];
}

interface ProfileInfoProps {
  profile: UserProfile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const profileFields = [
    { label: "Full Name", value: profile.name, icon: "👤" },
    { label: "Email Address", value: profile.email, icon: "📧" },
    { label: "Phone Number", value: profile.phone, icon: "📱" },
    { label: "User Role", value: profile.role, icon: "🎯" },
    { label: "Factory", value: profile.factories, icon: "🏭" },
    {
      label: "Join Date",
      value: new Date(profile.joinDate).toLocaleDateString(),
      icon: "📅",
    },
    {
      label: "Last Login",
      value: new Date(profile.lastLogin).toLocaleDateString(),
      icon: "🕒",
    },
    { label: "Account Status", value: profile.status, icon: "🔒" },
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <span className="text-lg">👤</span>
          Personal Information
        </CardTitle>
        <CardDescription>
          Your profile details and account information
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {profileFields.map((field, index) => {
            const value = field.value;

            return (
              <div
                key={index}
                className="flex gap-3 items-center p-3 rounded-lg border"
              >
                <span className="text-xl">{field.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500">
                    {field.label}
                  </div>

                  <div className="text-lg font-semibold">
                    {Array.isArray(value) ? (
                      <div className="flex flex-wrap gap-2">
                        {value.map((factory) => (
                          <Badge
                            key={factory.id}
                            variant={
                              factory.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {factory.name}
                          </Badge>
                        ))}
                      </div>
                    ) : field.label === "Account Status" ? (
                      <Badge
                        variant={value === "active" ? "default" : "secondary"}
                      >
                        {value === "active" ? "Active" : "Inactive"}
                      </Badge>
                    ) : field.label === "User Role" &&
                      typeof value === "string" ? (
                      <Badge variant="outline" className="capitalize">
                        {value.replace("_", " ").toLowerCase()}
                      </Badge>
                    ) : (
                      (value ?? "—")
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export const demoProfile: UserProfile = {
  id: "1",
  name: "Abdul Rahman",
  email: "rahman@murimaster.com",
  phone: "+8801712345678",
  role: "PROJECT_OWNER",
  avatar: "/avatars/rahman.jpg",
  joinDate: "2024-01-15",
  lastLogin: "2024-12-19T10:30:00Z",
  status: "active",
  factories: [
    { id: "1", name: "Muri Master - Dhaka", role: "Owner", status: "active" },
    {
      id: "2",
      name: "Muri Master - Chittagong",
      role: "Owner",
      status: "active",
    },
    {
      id: "3",
      name: "Muri Master - Rajshahi",
      role: "Owner",
      status: "inactive",
    },
  ],
};
