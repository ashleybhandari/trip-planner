import { cn } from "@/lib/utils";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarPages } from "./SidebarPages";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "h-screen flex flex-col p-2 gap-8 md:gap-4 bg-secondary",
        className
      )}
    >
      <SidebarPages />
      <SidebarFooter />
    </div>
  );
}
