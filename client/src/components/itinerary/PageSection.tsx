import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageSection({ children, className }: PageSectionProps) {
  return (
    <section
      className={cn(
        "flex justify-center rounded-md border border-outline/40",
        className
      )}
    >
      {children}
    </section>
  );
}
