import { useNavigate } from "react-router";
import { cn } from "@/utils/cn";
import { DASHBOARD_CARD_CLASSES } from "./dashboard-card-classes";

type DashboardCardProps = {
  name: string;
  destination: string;
  members: string[];
  slug: string;
  className?: string;
};

export default function DashboardCard({
  name,
  destination,
  members,
  slug,
}: DashboardCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/trip/${slug}/summary`)}
      className={cn(DASHBOARD_CARD_CLASSES, "flex flex-col gap-1")}
    >
      <h3 className="text-on-surface text-lg font-bold">{name}</h3>
      <p className="text-md">{destination}</p>
      <p className="text-sm">{members.join(", ")}</p>
    </div>
  );
}
