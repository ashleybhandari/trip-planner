import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";
import { useNavigate } from "react-router-dom";
import AddCollaborators from "@/components/add-collaborators/AddCollaborators";

type Trip = {
  name: string;
  destination: string;
  members: string[];
  slug: string;
  archived: boolean;
};

//COMMENTING OUT ARCHIVED TRIPS MOCK DATA FOR NOW

// const archivedTrips = {
//   2024: [
//     {
//       name: "TRIP NAME #1",
//       destination: "Destination",
//       members: "Me, Name1, Name2, Name3, and Name4",
//     },
//     {
//       name: "TRIP NAME #2",
//       destination: "Destination",
//       members: "Me, Name1, Name2, Name3",
//     },
//     {
//       name: "TRIP NAME #3",
//       destination: "Destination",
//       members: "Me, Name1",
//     },
//   ],
//   2023: [
//     {
//       name: "TRIP NAME #1",
//       destination: "Destination",
//       members: "Me, Name1, Name2, Name3, and Name4",
//     },
//     {
//       name: "TRIP NAME #2",
//       destination: "Destination",
//       members: "Me, Name1, Name2, Name3",
//     },
//   ],
// };


const DashboardView = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [form, setForm] = useState({
    name: "",
    destination: "",
    collaborators: [],
  });
  const [open, setOpen] = useState(false);

  const [archived_Trips, setArchived_Trips] = useState<Trip[]>([]);

  // WORKS WITH THIS MOCK DATA CAN BE REMOVED LATER
  // useEffect(() => {
  //   const fetchTrips = async () => {
  //     // Simulate waiting for a fetch call
  //     await new Promise((resolve) => setTimeout(resolve, 200));
  
  //     // Simulated data
  //     const mockData = [
  //       {
  //         name: "Archived Trip",
  //         destination: "Rome",
  //         members: ["You", "Friend A"],
  //         slug: "rome-trip-2024",
  //         archived: true,
  //       },
  //       {
  //         name: "Active Trip",
  //         destination: "Tokyo",
  //         members: ["You", "Friend B"],
  //         slug: "tokyo-trip-2024",
  //         archived: false,
  //       },
  //     ];
  
  //     setTrips(mockData.filter((t) => !t.archived));
  //     setArchived_Trips(mockData.filter((t) => t.archived));
  //   };
  
  //   fetchTrips();
  // }, []);
 
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
        }));

        const archived: Trip[] = formattedTrips.filter((trip) => trip.archived)
        

        setTrips(formattedTrips);
        setArchived_Trips(archived);
        console.log(data);
      } catch (err) {
        console.error("Failed to load trips:", err);
      }
    };

    fetchTrips();
  }, []);

  const setCollaborators = (collaborators: string[]) => {
    setForm((prev) => ({ ...prev, collaborators }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${serverUrl}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tripName: form.name,
          destinations: form.destination,
          collaboratorEmails: form.collaborators,
        }),
      });

      if (!res.ok) throw new Error("Failed to create trip");

      const newTrip = await res.json();

      const trip: Trip = {
        name: newTrip.tripName,
        destination: newTrip.destinations,
        members: newTrip.users.map(
          (u: any) => u.name || u.email || "Collaborator"
        ),
        slug: newTrip.tripSlug,
      };

      setTrips((prev) => [...prev, trip]);
      setForm({ name: "", destination: "", collaborators: [] });
      setOpen(false);
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">trip planner</h1>
        {/* <button className="bg-white text-green-700 px-4 py-2 rounded-md">Sign Out</button> */}
        <LogoutButton />
      </nav>

      <div className="w-4xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-center mb-4">my trips</h2>
        <div className="grid grid-cols-2 gap-4 justify-center">
          {/* Create Trip Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="bg-white shadow-md rounded-lg flex items-center justify-center h-32 border border-gray-300 cursor-pointer">
                <FaPlus className="text-3xl text-gray-500" />
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col sm:w-md">
              <DialogHeader>
                <DialogTitle>Create a new trip</DialogTitle>
                <DialogDescription>
                  Start off by adding a few details. You can always change these
                  later.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trip Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination(s)
                  </label>
                  <Input
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                  />
                </div>
                <AddCollaborators setCollaborators={setCollaborators} />
                <div className="flex justify-end pt-2">
                  <Button onClick={handleCreate}>Create</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Existing Trips */}
          {trips.map((trip, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/trip/${trip.slug}`)}
            >
              <h3 className="text-md font-bold">{trip.name}</h3>
              <p className="text-gray-500">{trip.destination}</p>
              <p className="text-gray-600 text-sm">{trip.members.join(", ")}</p>
            </div>
          ))}
        </div>

        {/* Archive Section */}
        <h2 className="text-lg font-semibold text-center mt-8 mb-4">archive</h2>
        <div className="grid grid-cols-3 gap-4">
        {archived_Trips.map((trip, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-md font-bold">{trip.name}</h3>
            <p className="text-gray-500">{trip.destination}</p>
            <p className="text-gray-600 text-sm">{trip.members.join(", ")}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default DashboardView;
