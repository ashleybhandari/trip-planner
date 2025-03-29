import { Outlet } from "react-router";
import { useEffect, useState } from "react";

import { HamburgerMenu } from "@/components/navigation/HamburgerMenu";
import { Sidebar } from "@/components/navigation/Sidebar";

import { Checklist } from "@/types/Checklist";
import { MOCK_CHECKLISTS } from "@/mock-data/mock-checklists";
import { NavContext } from "@/Contexts";

export default function TripLayout() {
  const [pageVisible, setPageVisible] = useState(true);
  const [selected, setSelected] = useState("");
  const [checklists, setChecklists] = useState<Checklist[]>([]);

  // fetch checklists
  useEffect(() => setChecklists(MOCK_CHECKLISTS), []);

  return (
    <NavContext.Provider
      value={{ selected, setSelected, checklists, setChecklists }}
    >
      <div className="flex flex-col md:flex-row">
        <HamburgerMenu
          setPageVisible={setPageVisible}
          className="flex md:hidden"
        />
        <Sidebar className="hidden md:flex w-60" />
        {pageVisible && (
          <main className="grow flex justify-center">
            <Outlet />
          </main>
        )}
      </div>
    </NavContext.Provider>
  );
}
