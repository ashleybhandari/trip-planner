import { SidebarFooter } from "./SidebarFooter";
import { SidebarPages } from "./SidebarPages";

export function Sidebar() {
  return (
    <div className="h-screen flex flex-col p-2 w-52 bg-secondary">
      <SidebarPages />
      <SidebarFooter />
    </div>
  );
}
