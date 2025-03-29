import { cn } from "@/lib/utils";
import { NavChecklists } from "./NavChecklists";
import { NavFooter } from "./NavFooter";
import { NavPages } from "./NavPages";

type NavigationProps = {
  className?: string;
};

// Navigation menu containing pages, checklists, and buttons to go to dashboard
// and sign out
export function Navigation({ className }: NavigationProps) {
  return (
    <div
      className={cn(
        "h-screen flex flex-col p-2 gap-8 md:gap-4 bg-secondary",
        className
      )}
    >
      <div className="grow flex flex-col justify-between gap-4 my-2">
        <NavPages />
        <NavChecklists />
      </div>
      <NavFooter />
    </div>
  );
}
