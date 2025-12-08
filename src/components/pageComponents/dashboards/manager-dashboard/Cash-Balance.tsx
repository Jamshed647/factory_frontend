import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { MetricCard } from "@/components/ui/metric-card";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const CashBalance = ({
  factoryId,
  factoryLoading,
}: {
  factoryId: string;
  factoryLoading: boolean;
}) => {
  const { t } = useLanguage();
  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/cash/factory/${factoryId}`,
    queryKey: "getCashDataByFactory",
  });

  const cash = data?.data[0];

  return (
    <div>
      <MetricCard
        isLoading={isLoading || factoryLoading}
        link={`/factory/cash`}
        title={t.cashBalance}
        value={cash?.balance ?? 0}
        description={t.availableUnits}
        icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default CashBalance;
