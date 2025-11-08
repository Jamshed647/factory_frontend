"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings } from "lucide-react";

export function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Settings className="w-5 h-5" />
          System Configuration
        </CardTitle>
        <CardDescription>Configure system-wide settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <button className="p-3 w-full text-left rounded-lg border transition-colors hover:bg-gray-50">
            ⚙️ General Settings
          </button>
          <button className="p-3 w-full text-left rounded-lg border transition-colors hover:bg-gray-50">
            🔐 Security Policies
          </button>
          <button className="p-3 w-full text-left rounded-lg border transition-colors hover:bg-gray-50">
            📧 Email Templates
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
