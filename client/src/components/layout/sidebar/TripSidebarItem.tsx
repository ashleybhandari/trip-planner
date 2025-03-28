import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

type TripSidebarItemProps = {
  link: string;
  children: React.ReactNode;
  className?: string;
};

export function TripSidebarItem({
  link,
  children,
  className,
}: TripSidebarItemProps) {
  return (
    <NavLink
      to={link}
      className={cn(
        "font-bold lowercase rounded h-12 px-3 flex items-center text-on-secondary hover:bg-on-secondary hover:text-secondary",
        className
      )}
    >
      {children}
    </NavLink>
  );
}
