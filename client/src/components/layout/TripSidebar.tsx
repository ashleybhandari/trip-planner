import { NavLink } from "react-router";

export function TripSidebar() {
  return (
    <nav className="h-screen flex flex-col gap-4 p-10 font-bold bg-secondary text-on-secondary">
      <NavLink to="/trip">My Trip</NavLink>
      <NavLink to="itinerary">Itinerary</NavLink>
      <NavLink to="map">Map</NavLink>
      <NavLink to="budget">Budget</NavLink>
      <NavLink to="checklist">Checklist</NavLink>
    </nav>
  );
}
