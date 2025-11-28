"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { StatusWithIcon } from "@/components/common/Badge/status_point";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/hooks";
import { Separator } from "@radix-ui/react-select";
import DueDialog from "./_assets/components/DueDialog";

const CashPage = () => {
  const { user } = useAuth();
  const factory = user?.factory;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/cash/factory/${factory?.id}`,
    queryKey: "getCashDataByFactory",
  });

  const balanceInfo = data?.data[0];

  return (
    <div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <p className="text-xl font-bold"> Name: {factory?.name}</p>

            <p className="text-sm">Address: {factory?.address}</p>
            <div>
              Status:
              <StatusWithIcon status={factory?.status as string} />
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>

              <p
                className={`text-2xl font-bold ${
                  (data?.data?.balance ?? 0) < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                ৳ {balanceInfo?.balance ?? 0}
              </p>
            </div>
            <div className="flex gap-2">
              <DueDialog factory={factory} type="TAKE" />
              <DueDialog factory={factory} type="PAY" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashPage;
