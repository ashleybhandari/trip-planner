import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Email from "./Email";
import { validateEmail } from "./validate-email";

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

  // remove email when X button is clicked
  const handleDeleteEmail = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  // handle input changes
  const handleChange = (e) => {
    const input = e.target.value; // user input
    const position = e.target.selectionStart - 1; // cursor position
    let newEmailAdded = false;

    // if user inputted a space or comma, check if we can add a new email
    if (input.charAt(position) === " " || input.charAt(position) === ",")
      newEmailAdded = addToEmails(input, position);

    // if no email was added, update field with inputted character
    if (!newEmailAdded) setInputValue(input);
  };

  // detect key presses
  const handleKeyDown = (e) => {
    // if enter, add trailing text to emails
    if (e.key === "Enter") addToEmails(inputValue, inputValue.length);

    // if backspace, remove last email (if possible)
    if (
      e.key === "Backspace" &&
      e.target.selectionStart === 0 &&
      emails.length > 0
    ) {
      setEmails((prev) => prev.filter((e, i) => i < emails.length - 1));
    }
  };

  // add to emails (if possible)
  const addToEmails = (input: string, position: number) => {
    const newEmail = input.substring(0, position).trim(); // text up to position

    if (newEmail) {
      setEmails((prev) => [...prev, newEmail]);
      setInputValue(input.slice(position + 1)); // text after position
      return true;
    }

    return false;
  };

  // set collaborators property in parent's form
  useEffect(() => {
    const collaborators = inputValue.trim() ? [...emails, inputValue] : emails;
    const validated = [...new Set(collaborators)].filter((c) =>
      validateEmail(c)
    );
    setCollaborators(validated);
    console.log(validated)
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
      {emails.some((e) => !validateEmail(e)) && (
        <div className="text-xs text-error m-1">
          Warning: One or more of the above emails is invalid.
        </div>
      )}
    </div>
  );
}
