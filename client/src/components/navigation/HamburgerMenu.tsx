import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { AlignLeft, X } from "lucide-react";
import { Navigation } from "./Navigation";
import { NavContext } from "@/Contexts";
import { PAGES } from "@/components/navigation/pages";

type HamburgerMenuProps = {
  className?: string;
};

// Top navbar with hamburger button and page name. Clicking the hamburger opens
// a full-screen navigation menu.
export function HamburgerMenu({ className }: HamburgerMenuProps) {
  const [openedPageName, setOpenedPageName] = useState<string | null>(); // null = menu is open
  const { selected, checklists } = useContext(NavContext);

  const handleCLoseMenu = () => {
    // get page name
    let name = PAGES.find((page) => page.link === selected)?.label;
    if (!name) name = checklists.find((list) => list.id === selected)?.name;

    setOpenedPageName(name || null);
  };

  // Close menu and show page when something is selected
  useEffect(() => {
    if (!openedPageName) handleCLoseMenu();
  }, [selected]);

  return (
    <div
      className={cn(
        "w-screen bg-secondary text-on-secondary",
        { "fixed z-50": !openedPageName },
        className
      )}
    >
      {openedPageName ? (
        <div className="w-full h-12 relative">
          <button
            onClick={() => setOpenedPageName(null)}
            className="p-3 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2"
          >
            <AlignLeft />
          </button>
          <div className="lowercase font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            {openedPageName}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-screen h-screen p-3">
          <button onClick={handleCLoseMenu} className="cursor-pointer">
            <X />
          </button>
          <Navigation className="px-10 py-5 grow" />
        </div>
      )}
    </div>
  );
}
