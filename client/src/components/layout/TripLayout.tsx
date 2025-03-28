import { Outlet } from "react-router";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";

export default function TripLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="grow flex justify-center">
        <Outlet />
      </main>
    </div>
  );
}
