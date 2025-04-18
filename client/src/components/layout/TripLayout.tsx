import { Outlet, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";

import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { Navigation } from "@/components/navigation/Navigation";

import { Checklist } from "@/types/Checklist";
import { MOCK_CHECKLISTS } from "@/mock/mock-checklists";
import { NavContext } from "@/Contexts";
import { PAGES } from "@/components/navigation/pages";

// Navigation + page content. When the screen is small, move navigation into a
// hamburger button (when open, it covers the entire page)
export default function TripLayout() {
  const [selected, setSelected] = useState("");
  const [checklists, setChecklists] = useState<Checklist[]>([]);

  const { checklistId } = useParams();
  const location = useLocation();

  // initialize selected
  useEffect(() => {
    // get page route using URL
    const curPage = PAGES.find((page) =>
      location.pathname.includes(page.link)
    )?.link;

    // if route isn't a main page, it's a checklist
    setSelected(curPage ?? checklistId!);
  }, [location.pathname, setSelected, checklistId]);

  // fetch checklists
  useEffect(() => {
    setChecklists(MOCK_CHECKLISTS);
  }, [setChecklists]);

  return (
    <div className="flex flex-col md:flex-row">
      <NavContext.Provider
        value={{ selected, setSelected, checklists, setChecklists }}
      >
        <MobileNavigation className="flex md:hidden" />
        <Navigation className="hidden md:flex w-60" />
      </NavContext.Provider>
      <main className="grow flex justify-center h-screen overflow-y-scroll p-3">
        <Outlet />
      </main>
    </div>
  );
}
