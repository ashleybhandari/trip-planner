import { cn } from "@/utils/cn";

type TextAreaProps = {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
  placeholder,
  defaultValue,
  className,
  value, 
  onChange
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      className={cn("outline-0 resize-none min-h-48", className)}
    ></textarea>
  );
}
