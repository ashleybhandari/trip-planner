import { cn } from "@/lib/utils";

type BudgetCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function BudgetCard({
  title,
  children,
  className,
}: BudgetCardProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 bg-tertiary-container text-on-tertiary-container rounded-md p-7", className)}
    >
      <h3 className="text-lg font-bold lowercase">{title}</h3>
      <div className="grow flex flex-col justify-center">{children}</div>
    </div>
  );
}
