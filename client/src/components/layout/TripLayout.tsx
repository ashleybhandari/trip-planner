import { Outlet } from "react-router";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { HamburgerMenu } from "./sidebar/HamburgerMenu";
import { useState } from "react";

export default function TripLayout() {
  const [pageVisible, setPageVisible] = useState(true);

  return (
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
  );
}
