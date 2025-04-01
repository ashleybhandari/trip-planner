import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageSection({ children, className }: PageSectionProps) {
  return (
    <section
      className={cn(
        "flex justify-center rounded-md border border-outline/40 px-4 py-2",
        className
      )}
    >
      {children}
    </section>
  );
}
