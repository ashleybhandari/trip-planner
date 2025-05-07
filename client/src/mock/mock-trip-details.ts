import { TripDetails } from "@/types/TripDetails";
import { MOCK_USERS } from "./mock-expenses";

export const MOCK_TRIP_DETAILS: TripDetails = {
  name: "My trip's name",
  destinations: ["China", "Japan", "Indonesia"],
  startDate: new Date(2025, 3, 23),
  endDate: new Date(2025, 4, 25),
  collaborators: Object.values(MOCK_USERS),
  id: "660fc1234abcde567890abcd",
  archived: true
};
