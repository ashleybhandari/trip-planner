import { cn } from "@/utils/cn";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

type ItemProps = {
  children: React.ReactNode;
  assignedTo: string;
  checked: boolean;
  onCheck: () => void;
  onDelete: () => void;
};

export default function Item({
  children,
  assignedTo,
  checked,
  onCheck,
  onDelete,
}: ItemProps) {
  return (
    <div className="flex gap-4 items-center w-full">
      <button
        onClick={onCheck}
        className="hover:text-primary active:text-primary/80 cursor-pointer"
      >
        {checked ? (
          <CheckCircle2 className="text-outline" size={22} />
        ) : (
          <Circle size={22} />
        )}
      </button>
      <div className="w-full flex flex-col sm:flex-row">
        <div
          className={cn("w-7/10 font-semibold", {
            "line-through text-outline font-normal": checked,
          })}
        >
          {children}
        </div>
        <div className="text-secondary">
          {assignedTo ? "@" + assignedTo : "Unassigned"}
        </div>
      </div>
      <button
        onClick={onDelete}
        className="hover:text-primary active:text-primary/80 cursor-pointer"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
