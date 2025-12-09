import { Bell, CircleUserRound } from "lucide-react";
import Link from "next/link";
import ActionButton from "../common/button/actionButton";
import { useFactory } from "@/utils/factoryInfo";
// import LanguageSwitcher from "../common/LanguageSwitcher";

export default function HeaderBar() {
  const { factory } = useFactory();

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
      <Link href="/">
        <h2
          style={{ margin: 0, fontSize: 18 }}
          className="font-semibold capitalize"
        >
          {factory?.name}
        </h2>
      </Link>

      <div className="flex gap-3">
        <Link className="!h-fit w-fit bg-red" href="#">
          <ActionButton icon={<Bell />} tooltipContent="Notifications" />
        </Link>

        {/* <LanguageSwitcher /> */}

        <Link className="!h-fit w-fit bg-red" href={`profile`}>
          <ActionButton icon={<CircleUserRound />} />
        </Link>
      </div>
    </div>
  );
}
