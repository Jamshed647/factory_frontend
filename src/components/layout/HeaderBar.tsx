import { Bell, CircleUserRound } from "lucide-react";
import Link from "next/link";
import ActionButton from "../common/button/actionButton";
import { useFactory } from "@/utils/factoryInfo";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { useAuth } from "@/hooks/hooks";
import { getPath } from "@/utils/roleUtils";
import { UserRole } from "@/types/user";

export default function HeaderBar() {
  const { user } = useAuth();
  const { factory } = useFactory();

  const path = getPath(user?.role as UserRole);

  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4px",
        background: "#fff",
        position: "relative",
      }}
    >
      <Link href={`${path}/dashboard`}>
        <h2
          style={{ margin: 0, fontSize: 18 }}
          className="font-semibold capitalize"
        >
          {factory?.name ?? "JangoSoft"}
        </h2>
      </Link>

      <div className="flex gap-3">
        <Link className="!h-fit w-fit bg-red" href="#">
          <ActionButton icon={<Bell />} tooltipContent="Notifications" />
        </Link>

        <LanguageSwitcher />

        <Link className="!h-fit w-fit bg-red" href={`${path}/profile`}>
          <ActionButton icon={<CircleUserRound />} />
        </Link>
      </div>
    </div>
  );
}
