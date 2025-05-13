import { useEffect, useState } from "react";

import LogoutButton from "@/components/auth/LogoutButton";
import TripArchive from "@/components/dashboard/TripArchive";

import { Trip } from "@/types/Trip";
import { MOCK_ARCHIVED_TRIPS } from "@/mock/mock-archived-trips";
import CreateTripDialog from "@/components/dashboard/CreateTripDialog";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { sortTripsByDate } from "@/utils/sort-trips-by-date";

const DashboardView = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [archived, setArchived] = useState<Map<number, Trip[]>>(new Map());

  const HEADER_CLASSES =
    "text-secondary text-xl font-semibold text-center mb-10";

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const serverUrl = import.meta.env.VITE_SERVER_URL;

        const res = await fetch(`${serverUrl}/api/trips`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const formattedTrips: Trip[] = data.map((trip: any) => ({
          name: trip.tripName,
          destination: trip.destinations,
          members: trip.users.map(
            (u: any) => u.name || u.email || "Collaborator"
          ),
          slug: trip.tripSlug,
          creationDate: trip.dates?.creationDate,
        }));

        sortTripsByDate(formattedTrips);
        setTrips(formattedTrips);
      } catch (err) {
        console.error("Failed to load trips:", err);
      }
    };

    fetchTrips();
  }, []);

  useEffect(() => {
    const archivedTrips = new Map<number, Trip[]>();

    MOCK_ARCHIVED_TRIPS.forEach((trip) => {
      const year = trip.creationDate.getFullYear();
      const trips = archivedTrips.get(year) ?? [];
      archivedTrips.set(year, [...trips, trip]);
    });

    archivedTrips.forEach((trip) => sortTripsByDate(trip));
    setArchived(archivedTrips);
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-center bg-surface">
      <nav className="bg-primary text-on-primary p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">trip planner</h1>
        <LogoutButton className="h-9 w-20 text-sm text-on-surface bg-surface hover:bg-surface/90 active:bg-surface" />
      </nav>
      <div className="w-fit flex flex-col items-center self-center gap-20 my-10">
        <div>
          <h2 className={HEADER_CLASSES}>my trips</h2>
          <TripArchive />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
            <CreateTripDialog setTrips={setTrips} />
            {trips.map((trip) => (
              <DashboardCard
                key={trip.slug}
                name={trip.name}
                destination={trip.destination}
                members={trip.members}
                slug={trip.slug}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className={HEADER_CLASSES}>archive</h2>
          {[...archived].map(([year, trips]) => (
            <div
              key={year.toString()}
              className="flex flex-col lg:flex-row items-center gap-6 mb-10 lg:mb-4"
            >
              <h3 className="text-outline font-semibold">- {year} -</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trips.map((trip) => (
                  <DashboardCard
                    key={trip.slug}
                    name={trip.name}
                    destination={trip.destination}
                    members={trip.members}
                    slug={trip.slug}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
