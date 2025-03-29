import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { AlignLeft, X } from "lucide-react";

type HamburgerMenuProps = {
  setPageVisible: (state: boolean) => void;
  className?: string;
};
export function HamburgerMenu({
  setPageVisible,
  className,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setPageVisible(!isOpen);
  }, [setPageVisible, isOpen]);

  return (
    <div className={cn("bg-secondary text-on-secondary", className)}>
      {isOpen ? (
        <div className="flex flex-col w-screen h-screen p-10">
          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
            <X />
          </button>
          <Sidebar className="px-10 py-5 grow" />
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="p-2 cursor-pointer">
          <AlignLeft />
        </button>
      )}
    </div>
  );
}
