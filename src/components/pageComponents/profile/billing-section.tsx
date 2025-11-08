"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

interface BillingSectionProps {
  isProjectOwner?: boolean;
}

export function BillingSection({
  isProjectOwner = false,
}: BillingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <CreditCard className="w-5 h-5" />
          {isProjectOwner ? "System Billing" : "Subscription"}
        </CardTitle>
        <CardDescription>
          Manage billing and subscription details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <button className="p-3 w-full text-left rounded-lg border transition-colors hover:bg-gray-50">
            💳 View Billing History
          </button>
          <button className="p-3 w-full text-left rounded-lg border transition-colors hover:bg-gray-50">
            📄 Invoice Details
          </button>
          {isProjectOwner && (
            <button className="p-3 w-full text-left rounded-lg border transition-colors hover:bg-gray-50">
              🏢 Company Subscriptions
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
