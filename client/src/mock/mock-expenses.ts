import { Expense } from "@/types/Expense";

export enum MOCK_USERS {
  Aishwarya = "Aishwarya",
  Ashley = "Ashley",
  Nehal = "Nehal",
  Subhangi = "Subhangi",
}

export const MOCK_EXPENSES: Expense[] = [
  {
    name: "Plane tickets",
    date: new Date(2025, 2, 25),
    amount: 400,
    payer: MOCK_USERS.Aishwarya,
  },
  {
    name: "Hotel 1",
    date: new Date(2025, 2, 26),
    amount: 100,
    payer: MOCK_USERS.Ashley,
  },
  {
    name: "Hotel 2",
    date: new Date(2025, 2, 27),
    amount: 150,
    payer: MOCK_USERS.Nehal,
  },
  {
    name: "Train tickets",
    date: new Date(2025, 2, 28),
    amount: 80,
    payer: MOCK_USERS.Subhangi,
  },
  {
    name: "Fancy lunch",
    date: new Date(2025, 2, 23),
    amount: 180,
    payer: MOCK_USERS.Subhangi,
  },
];
