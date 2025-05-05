import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Email from "./Email";

type AddCollaboratorsProps = {
  setCollaborators: (collaborators: string[]) => void;
  className?: string;
};

export default function AddCollaborators({
  setCollaborators,
  className,
}: AddCollaboratorsProps) {
  const [inputValue, setInputValue] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteEmail = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const position = e.target.selectionStart - 1;
    let newEmailAdded = false;

    if (input.charAt(position) === " " || input.charAt(position) === ",")
      newEmailAdded = addToEmails(input, position);

    if (!newEmailAdded) setInputValue(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addToEmails(inputValue, inputValue.length);

    if (
      e.key === "Backspace" &&
      e.target.selectionStart === 0 &&
      emails.length > 0
    ) {
      setEmails((prev) => prev.filter((e, i) => i < emails.length - 1));
    }
  };

  const addToEmails = (input: string, position: number) => {
    const newEmail = input.substring(0, position).trim();

    if (newEmail) {
      setEmails((prev) => [...prev, newEmail]);
      setInputValue(input.slice(position + 1));
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    setCollaborators(inputValue.trim() ? [...emails, inputValue] : emails);
  }, [emails, inputValue]);

  return (
    <div className={cn("", className)}>
      <label className="text-sm font-medium text-gray-700">
        Collaborator Email(s)
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex min-h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "flex gap-2"
        )}
      >
        <ul className="w-full flex flex-wrap items-center gap-1">
          {emails.map((e) => (
            <li key={e}>
              <Email onDeleteEmail={() => handleDeleteEmail(e)}>{e}</Email>
            </li>
          ))}
          <li className="grow">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={
                emails.length == 0
                  ? "email1@example.com, email2@example.com"
                  : ""
              }
              className="w-full outline-none"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
