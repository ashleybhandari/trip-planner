import { Outlet } from "react-router";
import { TripSidebar } from "@/components/layout/sidebar/TripSidebar";

export default function TripLayout() {
  return (
    <div className="flex">
      <TripSidebar />
      <main className="grow flex justify-center">
        <Outlet />
      </main>
    </div>
  );
}
