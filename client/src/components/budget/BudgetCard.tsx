import { cn } from "@/lib/utils";
import PageSection from "@/components/ui/PageSection";

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
    <PageSection
      className={cn(
        "bg-secondary-container text-on-secondary-container flex flex-col gap-2 p-7",
        className
      )}
    >
      <h3 className="text-xl font-bold lowercase tracking-wide">{title}</h3>
      <div className="grow flex flex-col justify-center">{children}</div>
    </PageSection>
  );
}
