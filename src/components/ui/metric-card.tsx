import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { CustomField } from "../common/fields/cusField";

interface MetricCardProps {
  isLoading?: boolean;
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  link?: string;
  type?: string;
  setType?: (type: string) => void;
  options?: string[];
}

export function MetricCard({
  type,
  setType,
  options,
  title,
  value,
  description,
  trend,
  icon,
  link = "#",
  isLoading = false,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col justify-between h-40">
        <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
          <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div className="w-6 h-6 bg-gray-200 rounded dark:bg-gray-700"></div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between">
          <div className="space-y-2">
            <div className="w-3/4 h-7 bg-gray-200 rounded dark:bg-gray-700"></div>
            {description && (
              <div className="w-full h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
            )}
          </div>

          {trend && (
            <div className="flex items-center">
              <div className="mr-1 w-4 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="w-1/4 h-3 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Link
      href={link}
      className={`${link === "#" ? "pointer-events-none" : ""}`}
    >
      <Card className="flex flex-col justify-between h-36">
        <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between">
          <div
            className={`text-2xl font-bold text-${Number(value) < 0 ? "red" : "green"}-500`}
          >
            {Number.isInteger(Number(value))
              ? Number(value)
              : Number(value).toFixed(2)}
          </div>

          {/* Selection */}
          <div className="flex gap-3 justify-between items-center">
            {description && (
              <p className="text-xs capitalize text-muted-foreground">
                {description}
              </p>
            )}

            {type && setType && (
              <div onClick={(e) => e.stopPropagation()}>
                <CustomField.SingleSelectField
                  name="cashHistory"
                  placeholder="Select Range"
                  options={options ?? ["TODAY", "WEEKLY", "MONTHLY"]}
                  defaultValue={type}
                  onValueChange={(value: string) => setType?.(value)}
                />
              </div>
            )}
          </div>

          {trend && (
            <div
              className={`flex items-center text-xs ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="mr-1 w-4 h-4" />
              ) : (
                <TrendingDown className="mr-1 w-4 h-4" />
              )}
              {trend.value}%
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
