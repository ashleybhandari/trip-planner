import { NavItem } from "./NavItem";

// Buttons to return to dashboard and sign out
export function NavFooter() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <NavItem
        link="/"
        className="font-medium justify-center bg-on-primary text-on-primary-container"
      >
        Back to Dashboard
      </NavItem>
      <NavItem
        link="/"
        className="font-medium justify-center bg-secondary-container text-on-secondary-container hover:bg-error-container active:bg-error-container/90"
      >
        Sign Out
      </NavItem>
    </div>
  );
}
