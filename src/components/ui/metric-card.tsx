import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  link?: string;
}

export function MetricCard({
  title,
  value,
  description,
  trend,
  icon,
  link = "#",
}: MetricCardProps) {
  return (
    <Link href={link}>
      <Card className="flex flex-col justify-between h-40">
        {" "}
        {/* fixed height */}
        <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between">
          <div>
            <div
              className={`text-2xl font-bold text-${Number(value) < 0 ? "red" : "green"}-500`}
            >
              {value}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
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
