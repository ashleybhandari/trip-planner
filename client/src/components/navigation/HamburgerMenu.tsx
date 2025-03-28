import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { AlignLeft, X } from "lucide-react";
import { Navigation } from "./Navigation";
import { NavContext } from "@/Contexts";

type HamburgerMenuProps = {
  setPageVisible: (state: boolean) => void;
  className?: string;
};

// Top navbar with a hamburger button. Clicking the button opens a full-screen
// navigation menu.
export function HamburgerMenu({
  setPageVisible,
  className,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { selected } = useContext(NavContext);

  // Hide page when menu is open, show when closed
  useEffect(() => {
    setPageVisible(!isOpen);
  }, [setPageVisible, isOpen]);

  // Close menu and show page when something is selected
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
      setPageVisible(true);
    }
  }, [selected]);

  return (
    <div className={cn("bg-secondary text-on-secondary", className)}>
      {isOpen ? (
        <div className="flex flex-col w-screen h-screen p-3">
          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
            <X />
          </button>
          <Navigation className="px-10 py-5 grow" />
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="p-3 cursor-pointer">
          <AlignLeft />
        </button>
      )}
    </div>
  );
}
