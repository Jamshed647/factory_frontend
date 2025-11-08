"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, UserCheck } from "lucide-react";

interface UserManagementProps {
  manageableRoles: string[];
}

export function UserManagement({ manageableRoles }: UserManagementProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <UserCheck className="w-5 h-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage users under your supervision
          {manageableRoles.length > 0 && (
            <span className="block mt-1 text-xs">
              Can manage: {manageableRoles.join(", ")}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button className="justify-start p-3 w-full h-auto">
            <Users className="mr-3 w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">View All Users</div>
              <div className="text-sm text-gray-500">
                Manage users in your hierarchy
              </div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start p-3 w-full h-auto">
            <UserPlus className="mr-3 w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">Add New User</div>
              <div className="text-sm text-gray-500">
                Create new user accounts
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
