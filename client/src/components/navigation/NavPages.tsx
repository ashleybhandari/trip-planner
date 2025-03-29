import { useContext } from "react";
import { NavItem } from "./NavItem";
import { NavContext } from "@/Contexts";
import { PAGES } from "./pages";

// Selectable pages (excl. checklists)
export function NavPages() {
  const { selected, setSelected } = useContext(NavContext);

  return (
    <nav className="flex flex-col gap-2">
      {PAGES.map(({ link, label }) => (
        <NavItem
          key={label}
          link={link}
          isSelected={selected === link}
          onClick={() => setSelected(link)}
        >
          {label}
        </NavItem>
      ))}
    </nav>
  );
}
