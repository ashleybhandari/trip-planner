import { useContext } from "react";
import { SidebarItem } from "./SidebarItem";
import { NavContext } from "@/Contexts";
import { PAGES } from "./pages";

export function SidebarPages() {
  const { selected, setSelected } = useContext(NavContext);

  return (
    <nav className="flex flex-col gap-2">
      {PAGES.map(({ link, label }) => (
        <SidebarItem
          key={label}
          link={link}
          isSelected={selected === label}
          onClick={() => setSelected(label)}
        >
          {label}
        </SidebarItem>
      ))}
    </nav>
  );
}
