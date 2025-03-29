import { useContext } from "react";
import { SidebarItem } from "./SidebarItem";
import { NavContext } from "@/Contexts";
import { PAGES } from "./pages";

// Selectable pages (excl. checklists)
export function SidebarPages() {
  const { selected, setSelected } = useContext(NavContext);

  return (
    <nav className="flex flex-col gap-2">
      {PAGES.map(({ link, label }) => (
        <SidebarItem
          key={label}
          link={link}
          isSelected={selected === link}
          onClick={() => setSelected(link)}
        >
          {label}
        </SidebarItem>
      ))}
    </nav>
  );
}
