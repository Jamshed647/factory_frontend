import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { MetricCard } from "@/components/ui/metric-card";
import { TrendingUp } from "lucide-react";

const CashBalance = ({ factoryId }: { factoryId: string }) => {
  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/cash/factory/${factoryId}`,
    queryKey: "getCashDataByFactory",
  });

  const cash = data?.data[0];

  return (
    <div>
      <MetricCard
        isLoading={isLoading}
        link={`/factory/cash`}
        title="Cash Balance"
        value={cash?.balance ?? 0}
        description="Available units"
        icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default CashBalance;
