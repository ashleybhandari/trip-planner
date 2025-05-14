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
import { addChecklistItemFormSchema } from "./add-checklist-item-form-schema";

type AddChecklistItemFormProps = {
  collaborators: string[];
  onSubmit: (values: z.infer<typeof addChecklistItemFormSchema>) => void;
};

export default function AddChecklistItemForm({
  collaborators,
  onSubmit,
}: AddChecklistItemFormProps) {
  const form = useForm<z.infer<typeof addChecklistItemFormSchema>>({
    resolver: zodResolver(addChecklistItemFormSchema),
  });

  const handleSubmit = (values: z.infer<typeof addChecklistItemFormSchema>) => {
    onSubmit(values);
    form.reset({ label: "", assignedTo: "" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col sm:flex-row items-start gap-2"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To-do</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign to (optional)</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value ?? ""}
              >
                <FormControl className="min-w-48">
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem
                    value="unassigned"
                    className="hover:bg-secondary/10"
                  >
                    (Unassigned)
                  </SelectItem>
                  {collaborators.map((name) => (
                    <SelectItem key={name} value={name} className="hover:bg-secondary/10">
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="text-on-primary mt-[22px]"
        >
          Add Item
        </Button>
      </form>
    </Form>
  );
}
