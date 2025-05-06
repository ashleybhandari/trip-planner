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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addExpenseFormSchema } from "./add-expense-form-schema";

type AddExpenseFormProps = {
  collaborators: string[];
  onSubmit: (values: z.infer<typeof addExpenseFormSchema>) => void;
};

export default function AddExpenseForm({
  collaborators,
  onSubmit,
}: AddExpenseFormProps) {
  const form = useForm<z.infer<typeof addExpenseFormSchema>>({
    resolver: zodResolver(addExpenseFormSchema),
  });

  const handleSubmit = (values: z.infer<typeof addExpenseFormSchema>) => {
    onSubmit(values);
    form.reset({
      name: "",
      amount: undefined,
      payer: "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
                <Input {...field} value={field.value ?? ""} />
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value ?? ""}
              >
                <FormControl className="min-w-48">
                  <SelectTrigger>
                    <SelectValue placeholder="Select who paid" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {collaborators.map((name) => (
                    <SelectItem value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
