import { z } from "zod";

export const addChecklistItemFormSchema = z.object({
  label: z.string({ required_error: "Item cannot be empty" }),
  assignedTo: z.string(),
});
