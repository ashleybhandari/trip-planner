import { cn } from "@/utils/cn";
import { NavLink } from "react-router";

type NavItemProps = {
  children: React.ReactNode;
  isSelected?: boolean;
  link?: string;
  onClick?: () => void;
  className?: string;
};

// Styled button/link for the navigation menu
export function NavItem({
  children,
  isSelected,
  link,
  onClick,
  className,
}: NavItemProps) {
  return (
    <NavLink
      to={link ?? ""}
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
