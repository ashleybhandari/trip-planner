import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

type SidebarItemProps = {
  link: string;
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function SidebarItem({
  link,
  children,
  isSelected,
  onClick,
  className,
}: SidebarItemProps) {
  return (
    <NavLink
      to={link}
      onClick={onClick}
      className={cn(
        "font-bold lowercase rounded h-12 px-3 flex items-center text-on-secondary hover:bg-on-secondary active:bg-on-secondary/90 hover:text-secondary",
        {
          "bg-on-secondary text-secondary": isSelected,
          "bg-secondary text-on-secondary": !isSelected,
        },
        className
      )}
    >
      {children}
    </NavLink>
  );
}
