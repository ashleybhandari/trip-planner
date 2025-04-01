import { z } from "zod";

export const addExpenseFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  amount: z.coerce
    .number({
      invalid_type_error: "Amount must be a number",
    })
    .gt(0, { message: "Amount must be > 0" }),
  payer: z.string({ required_error: "Payer is required" }),
});
