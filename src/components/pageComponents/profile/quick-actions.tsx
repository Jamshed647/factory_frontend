/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  LogOut,
  Users,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  ShoppingCart,
  Package,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { UserRole } from "@/lib/data/profile-data";

interface QuickActionsProps {
  role: UserRole;
}

export function QuickActions({ role }: QuickActionsProps) {
  const handleAction = (action: string) => {
    toast.info(`${action} clicked!`);
  };

  // Common actions for all roles
  const commonActions = [
    {
      label: "Notification Settings",
      icon: <Bell className="w-4 h-4" />,
      action: () => handleAction("Notification Settings"),
      color: "text-blue-600",
    },
    {
      label: "Logout All Devices",
      icon: <LogOut className="w-4 h-4" />,
      action: () => handleAction("Logout All Devices"),
      color: "text-red-600",
    },
  ];

  // Role-specific actions
  const roleActions: Record<UserRole, any[]> = {
    PROJECT_OWNER: [
      {
        label: "System Analytics",
        icon: <BarChart3 className="w-4 h-4" />,
        action: () => handleAction("System Analytics"),
        color: "text-purple-600",
      },
      {
        label: "All Companies",
        icon: <Users className="w-4 h-4" />,
        action: () => handleAction("All Companies"),
        color: "text-green-600",
      },
      {
        label: "System Reports",
        icon: <FileText className="w-4 h-4" />,
        action: () => handleAction("System Reports"),
        color: "text-orange-600",
      },
    ],
    COMPANY_OWNER: [
      {
        label: "Company Analytics",
        icon: <BarChart3 className="w-4 h-4" />,
        action: () => handleAction("Company Analytics"),
        color: "text-purple-600",
      },
      {
        label: "Financial Reports",
        icon: <FileText className="w-4 h-4" />,
        action: () => handleAction("Financial Reports"),
        color: "text-green-600",
      },
      {
        label: "All Factories",
        icon: <Settings className="w-4 h-4" />,
        action: () => handleAction("All Factories"),
        color: "text-orange-600",
      },
    ],
    MANAGER: [
      {
        label: "Factory Dashboard",
        icon: <BarChart3 className="w-4 h-4" />,
        action: () => handleAction("Factory Dashboard"),
        color: "text-purple-600",
      },
      {
        label: "Production Reports",
        icon: <FileText className="w-4 h-4" />,
        action: () => handleAction("Production Reports"),
        color: "text-green-600",
      },
      {
        label: "Team Schedule",
        icon: <Calendar className="w-4 h-4" />,
        action: () => handleAction("Team Schedule"),
        color: "text-orange-600",
      },
    ],
    SALESMAN: [
      {
        label: "My Customers",
        icon: <Users className="w-4 h-4" />,
        action: () => handleAction("My Customers"),
        color: "text-purple-600",
      },
      {
        label: "Sales Reports",
        icon: <FileText className="w-4 h-4" />,
        action: () => handleAction("Sales Reports"),
        color: "text-green-600",
      },
      {
        label: "Today's Sales",
        icon: <ShoppingCart className="w-4 h-4" />,
        action: () => handleAction("Today's Sales"),
        color: "text-orange-600",
      },
    ],
    EMPLOYEE: [
      {
        label: "My Schedule",
        icon: <Calendar className="w-4 h-4" />,
        action: () => handleAction("My Schedule"),
        color: "text-purple-600",
      },
      {
        label: "Task List",
        icon: <FileText className="w-4 h-4" />,
        action: () => handleAction("Task List"),
        color: "text-green-600",
      },
      {
        label: "Production Targets",
        icon: <Package className="w-4 h-4" />,
        action: () => handleAction("Production Targets"),
        color: "text-orange-600",
      },
      {
        label: "Attendance",
        icon: <Clock className="w-4 h-4" />,
        action: () => handleAction("Attendance"),
        color: "text-blue-600",
      },
    ],
  };

  const allActions = [...commonActions, ...(roleActions[role] || [])];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {allActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start py-3 px-4 w-full h-auto transition-colors hover:bg-gray-50"
              onClick={action.action}
            >
              <span className={`mr-3 ${action.color}`}>{action.icon}</span>
              <span className="text-left">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
