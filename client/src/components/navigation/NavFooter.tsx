import { NavItem } from "./NavItem";
import LogoutButton from "@/components/auth/LogoutButton";

// Buttons to return to dashboard and sign out
export function NavFooter() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <NavItem
        link="/dashboard"
        className="font-medium justify-center bg-on-primary text-on-primary-container"
      >
        Back to Dashboard
      </NavItem>
      <LogoutButton />
    </div>
  );
}
