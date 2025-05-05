import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type EmailProps = {
  onDeleteEmail: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Email({
  onDeleteEmail,
  children,
  className,
}: EmailProps) {
  return (
    <div
      className={cn(
        "flex gap-1 items-center px-2 py-1 rounded-lg text-on-secondary-container bg-secondary-container",
        className
      )}
    >
      {children}
      <button onClick={() => onDeleteEmail()} className="cursor-pointer">
        <X size={15} />
      </button>
    </div>
  );
}
