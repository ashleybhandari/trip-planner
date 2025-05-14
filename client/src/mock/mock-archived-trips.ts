import { Trip } from "@/types/Trip";

export const MOCK_ARCHIVED_TRIPS: Trip[] = [
  {
    name: "TRIP NAME #1",
    destination: "Destination #1",
    members: ["Me", "Subhangi"],
    slug: "1",
    createdAt: new Date(2024, 10, 31),
  },
  {
    name: "TRIP NAME #2",
    destination: "Destination #2",
    members: ["Me", "Nehal"],
    slug: "2",
    createdAt: new Date(2024, 8, 1),
  },
  {
    name: "TRIP NAME #3",
    destination: "Destination #3",
    members: ["Me", "Nehal", "Aishwarya"],
    slug: "3",
    createdAt: new Date(2023, 3, 9),
  },
  {
    name: "TRIP NAME #4",
    destination: "Destination #4",
    members: ["Me"],
    slug: "4",
    createdAt: new Date(2022, 5, 23),
  },
  {
    name: "TRIP NAME #5",
    destination: "Destination #5",
    members: ["Me"],
    slug: "5",
    createdAt: new Date(2022, 2, 13),
  },
  {
    name: "TRIP NAME #6",
    destination: "Destination #6",
    members: ["Me"],
    slug: "6",
    createdAt: new Date(2022, 1, 1),
  },
];
