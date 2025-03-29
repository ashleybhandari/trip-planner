import { Outlet, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";

import { HamburgerMenu } from "@/components/navigation/HamburgerMenu";
import { Navigation } from "@/components/navigation/Navigation";

import { Checklist } from "@/types/Checklist";
import { MOCK_CHECKLISTS } from "@/mock-data/mock-checklists";
import { NavContext } from "@/Contexts";
import { PAGES } from "@/components/navigation/pages";

export default function TripLayout() {
  const [pageVisible, setPageVisible] = useState(true);
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

  // Navigation + page content. When the screen is small, move navigation into
  // a hamburger menu (and if menu is open, hide the rest of the page).
  return (
    <NavContext.Provider
      value={{ selected, setSelected, checklists, setChecklists }}
    >
      <div className="flex flex-col md:flex-row">
        <HamburgerMenu
          setPageVisible={setPageVisible}
          className="flex md:hidden"
        />
        <Navigation className="hidden md:flex w-60" />
        {pageVisible && (
          <main className="grow flex justify-center">
            <Outlet />
          </main>
        )}
      </div>
    </NavContext.Provider>
  );
}
