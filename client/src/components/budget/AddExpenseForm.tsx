import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addExpenseFormSchema } from "./add-expense-form-schema";

type AddExpenseFormProps = {
  onSubmit: (values: z.infer<typeof addExpenseFormSchema>) => void;
};

export default function AddExpenseForm({ onSubmit }: AddExpenseFormProps) {
  const form = useForm<z.infer<typeof addExpenseFormSchema>>({
    resolver: zodResolver(addExpenseFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row items-start gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payer</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-error" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="text-on-primary mt-[22px]"
        >
          Add Expense
        </Button>
      </form>
    </Form>
  );
}
