import { cn } from "@/lib/utils";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

import { SidebarItem } from "./SidebarItem";
import { SIDEBAR_ITEMS } from "./sidebar-items";
import { SidebarChecklists } from "./SidebarChecklists";

export function Sidebar() {
  const [selected, setSelected] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="h-screen flex flex-col p-2 w-52 bg-secondary">
      <div className="grow flex flex-col gap-2">
        {SIDEBAR_ITEMS.map(({ link, label }) => (
          <SidebarItem
            key={label}
            link={link}
            className={cn({
              "bg-on-secondary text-secondary": selected.endsWith(link),
              "bg-secondary text-on-secondary": !selected.endsWith(link),
            })}
          >
            {label}
          </SidebarItem>
        ))}
        <SidebarChecklists />
      </div>
      <div className="flex flex-col gap-2">
        <SidebarItem
          link="/"
          className="bg-on-primary text-on-primary-container text-sm font-medium justify-center"
        >
          Back to Dashboard
        </SidebarItem>
        <SidebarItem
          link="/"
          className="bg-secondary-container text-on-secondary-container text-sm font-medium justify-center"
        >
          Sign Out
        </SidebarItem>
      </div>
    </nav>
  );
}
