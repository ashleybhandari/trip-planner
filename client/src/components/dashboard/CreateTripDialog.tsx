import { useState } from "react";
import { cn } from "@/utils/cn";

import AddCollaborators from "@/components/add-collaborators/AddCollaborators";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Trip } from "@/types/Trip";
import { useNavigate } from "react-router";
import { DASHBOARD_CARD_CLASSES } from "./dashboard-card-classes";

type CreateTripDialogProps = {
  setTrips: (trips: Trip[]) => void;
};

export default function CreateTripDialog({ setTrips }: CreateTripDialogProps) {
  const [form, setForm] = useState({
    name: "",
    destination: "",
    collaborators: [],
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setCollaborators = (collaborators: string[]) => {
    setForm((prev) => ({ ...prev, collaborators }));
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
        createdAt: newTrip.createdAt,
      };

      setTrips((prev) => [trip, ...prev]);
      setForm({ name: "", destination: "", collaborators: [] });
      setOpen(false);
      navigate(`/trip/${trip.slug}/summary`);
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            DASHBOARD_CARD_CLASSES,
            "flex items-center justify-center min-h-32"
          )}
        >
          <FaPlus className="text-3xl" />
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
            <Input name="name" value={form.name} onChange={handleChange} />
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
  );
}
