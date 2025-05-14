import { Trip } from "@/types/Trip";

export function sortTripsByDate(trips: Trip[]) {
  return trips.sort((a, b) => {
    if (!a.creationDate && !b.creationDate) return 0;
    if (!a.creationDate) return 1;
    if (!b.creationDate) return -1;
    return a.creationDate < b.creationDate ? 1 : -1;
  });
}
