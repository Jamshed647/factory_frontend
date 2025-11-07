/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusWithIcon } from "@/components/common/Badge/status_point";
import dateFormat from "@/utils/formatter/DateFormatter";

interface CompanyPageProps {
  factory: any;
  isLoading: boolean;
}
const FactoryInfo = ({ factory, isLoading }: CompanyPageProps) => {
  return (
    <>
      {isLoading ? (
        <div className="animate-pulse">
          {/* Top 2 Cards */}
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            {/* Company Info Skeleton */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  <Skeleton className="w-32 h-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Skeleton className="w-24 h-4 rounded" />
                    <Skeleton className="flex-1 h-4 rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Owner Info Skeleton */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  <Skeleton className="w-40 h-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Skeleton className="w-24 h-4 rounded" />
                    <Skeleton className="flex-1 h-4 rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            {/* Company Info */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Company Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  {factory?.name ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Address:</span>{" "}
                  {factory?.address ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Contact:</span>{" "}
                  {factory?.phone ?? "—"}
                </p>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <StatusWithIcon status={factory?.status} />
                </div>
                <p>
                  <span className="font-medium text-gray-700">Created:</span>{" "}
                  {factory?.createdAt
                    ? dateFormat.fullDateTime(factory.createdAt)
                    : "—"}
                </p>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Company Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  {factory?.companyOwner?.name ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {factory?.companyOwner?.phone ?? "—"}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default FactoryInfo;
