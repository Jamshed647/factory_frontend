/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { MetricCard } from "@/components/ui/metric-card";
import { Banknote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const BankOverview = ({
  factoryId,
  factoryLoading,
}: {
  factoryId: string;
  factoryLoading: boolean;
}) => {
  const { t } = useLanguage();
  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/bank/factory/${factoryId}`,
    queryKey: "getBankDataByFactory",
  });

  const totalBalance = data?.data?.reduce(
    (acc: any, cur: any) => acc + (cur.balance || 0),
    0,
  );

  return (
    <div>
      {" "}
      <MetricCard
        isLoading={isLoading || factoryLoading}
        link={`/factory/bank`}
        title={t.bankBalance}
        value={totalBalance}
        description={t.allBankAmount}
        icon={<Banknote className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default BankOverview;
