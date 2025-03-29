import { createContext } from "react";
import { Checklist } from "@/types/Checklist";

export const NavContext = createContext({
  selected: "",
  setSelected: (prev: string) => {},
  checklists: Array<Checklist>(),
  setChecklists: (prev: any) => {},
});
