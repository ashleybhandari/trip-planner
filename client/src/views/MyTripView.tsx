import { useEffect, useState } from "react";
import TripCard from "@/components/mytrip/TripCard";
import BigBox from "@/components/mytrip/BigBox";
import { Button } from "@/components/ui/button";


type Trip = {
 name: string;
 details: string;
};


export default function MyTripView() {
 const [tripName, setTripName] = useState<string>("DUMMY TRIP NAME");
 const [trips, setTrips] = useState<Trip[]>([]);
 const [loading, setLoading] = useState<boolean>(true);


 useEffect(() => {
   const fetchTrips = async () => {
     setTimeout(() => {
       const fetchedTrips: Trip[] = [
         { name: "Trip Name:", details: "" },
         { name: "Destination:", details: "" },
         { name: "Dates:", details: "" },
         { name: "Collaborators:", details: "" },
       ];
       setTrips(fetchedTrips);
       setLoading(false);
     }, 1000);
   };


   fetchTrips();
 }, []);


 return (
   <div className="flex flex-col items-center px-4 py-6 sm:px-6 lg:px-8">
     {/* TripCard with responsive width */}
     <TripCard tripName={tripName} width="w-full sm:w-[800px] md:w-[900px]" />


     {/* BigBox with responsive width */}
     <BigBox width="w-full sm:w-[800px] md:w-[900px]">
       {loading ? (
         <p>Loading trip details...</p>
       ) : trips.length > 0 ? (
         trips.map((trip, index) => (
           <div
             key={index}
             className="flex flex-col w-full p-4 rounded-lg shadow-md mb-4"
             style={{
               backgroundColor: 'var(--color-primary-fixed)', // Fixed background color for the box
               color: 'rgb(var(--color-shadow))', // Text color using --color-shadow
             }}
           >
             <h3 className="font-bold">{trip.name}</h3>
             <p className="break-words">{trip.details}</p>
           </div>
         ))
       ) : (
         <p>No trip details available.</p>
       )}


       {/* Buttons inside BigBox, aligned to the bottom */}
       <div className="flex justify-end gap-4 p-4 sm:fixed sm:bottom-4 sm:right-4 sm:w-[auto]">
         <Button className="bg-[var(--color-on-primary-container)] text-white hover:bg-opacity-80">
           Delete Trip
         </Button>
         <Button className="bg-[var(--color-on-primary-container)] text-white hover:bg-opacity-80">
           End Trip
         </Button>
       </div>
     </BigBox>
   </div>
 );
}


