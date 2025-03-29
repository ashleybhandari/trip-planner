import { SidebarItem } from "./SidebarItem";

export function SidebarFooter() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <SidebarItem
        link="/"
        className="font-medium justify-center bg-on-primary text-on-primary-container"
      >
        Back to Dashboard
      </SidebarItem>
      <SidebarItem
        link="/"
        className="font-medium justify-center bg-secondary-container text-on-secondary-container hover:bg-error-container active:bg-error-container/90"
      >
        Sign Out
      </SidebarItem>
    </div>
  );
}
