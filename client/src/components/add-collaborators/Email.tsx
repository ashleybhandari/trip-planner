import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { validateEmail } from "./validate-email";

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
  const isValid = validateEmail(children!.toString());

  return (
    <div
      className={cn(
        "flex gap-1 items-center px-2 py-1 rounded-lg text-on-secondary-container bg-secondary-container",
        { "text-on-error": !isValid, "bg-error": !isValid },
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
