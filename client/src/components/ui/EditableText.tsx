import { cn } from "@/utils/cn";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type EditableTextProps = {
  children: React.ReactNode;
  iconSize?: number;
  onSave?: (value: string) => void;
  className?: string;
};
export default function EditableText({
  children,
  iconSize = 18,
  onSave,
  className,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(children?.toString());
  const lastValue = useRef(children?.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing in input is reflected by UI
  const handleValueChange = (e) => setValue(e.target.value);

  // Save on Enter/Tab, cancel on Escape
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      saveChanges();
    } else if (e.key === "Escape") {
      cancelChanges();
    }
  };

  // Disable editing and save value as valid
  const saveChanges = () => {
    if (value && value.length > 0) {
      setIsEditing(false);
      lastValue.current = value;
      if (onSave) onSave(value!);
    } else {
      cancelChanges();
    }
  };

  // Disable editing and revert value to last valid value
  const cancelChanges = () => {
    setIsEditing(false);
    setValue(lastValue.current);
  };

  // Focus on input if edit button clicked
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    setValue(children?.toString());
  }, [children]);

  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          onBlur={saveChanges}
          className={cn(className)}
        ></input>
      ) : (
        <div className={cn("flex items-center gap-3", className)}>
          <span>{value}</span>
          <button className="cursor-pointer">
            <Pencil size={iconSize} onClick={() => setIsEditing(true)} />
          </button>
        </div>
      )}
    </>
  );
}
