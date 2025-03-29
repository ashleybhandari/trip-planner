import { SidebarFooter } from "./SidebarFooter";
import { SidebarPages } from "./SidebarPages";

export function Sidebar() {
  return (
    <div className="h-screen flex flex-col p-2 w-60 bg-secondary">
      <SidebarPages />
      <SidebarFooter />
    </div>
  );
}
