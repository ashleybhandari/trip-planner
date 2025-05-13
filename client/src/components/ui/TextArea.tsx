import { cn } from "@/utils/cn";

type TextAreaProps = {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export default function TextArea({
  placeholder,
  defaultValue,
  className,
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={cn("outline-0 resize-none min-h-48", className)}
    ></textarea>
  );
}
