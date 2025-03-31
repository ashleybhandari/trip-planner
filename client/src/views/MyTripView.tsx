import { useEffect, useState } from "react";
import TripCard from "@/components/mytrip/TripCard";
import BigBox from "@/components/mytrip/BigBox";
import { Button } from "@/components/ui/button";

// Example data type for trip
type Trip = {
  name: string;
  details: string;
};

export default function MyTripView() {
  // State to store trip name and trip data
  const [tripName, setTripName] = useState<string>("DUMMY TRIP NAME");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Example fetching function (replace with actual API call or data fetching logic)
  useEffect(() => {
    // Simulate an API call to fetch trip data
    const fetchTrips = async () => {
      // Simulate fetching data with a timeout
      setTimeout(() => {
        const fetchedTrips: Trip[] = [
          { name: "Trip Name:", details: "" },
          { name: "Destination:", details: "" },
          { name: "Dates:", details: "" },
          { name: "Collaborators:", details: "" },
        ];
        setTrips(fetchedTrips);
        setLoading(false); // Data fetching complete
      }, 1000); // Simulate a 1-second delay
    };

    fetchTrips(); // Call fetchTrips when component mounts
  }, []);

  return (
    <div className="flex flex-col px-4 py-6 lg:px-8">
      {/* Trip Card */}
      <TripCard tripName={tripName} />

      {/* Big Box for trips */}
      <BigBox>
        {loading ? (
          <p>Loading trip details...</p> // Display loading message
        ) : trips.length > 0 ? (
          trips.map((trip, index) => (
            <div
              key={index}
              className={`flex flex-col w-full sm:w-[850px] md:w-[650px] lg:w-[850px] p-4 rounded-lg shadow-md mb-4 ${
                index === 1 || index === 2 ? "flex-grow" : ""
              }`}
              style={{ backgroundColor: "var(--color-primary-container)" }}
            >
              <h3 className="font-bold">{trip.name}</h3>
              <p className="break-words">{trip.details}</p>
            </div>
          ))
        ) : (
          <p>No trip details available.</p>
        )}
      </BigBox>

      {/* Buttons container */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 lg:justify-end">
        <Button className="bg-black text-white hover:bg-gray-800">Delete Trip</Button>
        <Button className="bg-black text-white hover:bg-gray-800">End Trip</Button>
      </div>
    </div>
  );
}
