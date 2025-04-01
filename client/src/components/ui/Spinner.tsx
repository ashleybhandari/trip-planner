import { cn } from "@/lib/utils";

type SpinnerProps = {
  size?: number;
  className?: string;
};

// Loading spinner
// Source: https://github.com/shadcn-ui/ui/discussions/1694#discussioncomment-7477119
export default function Spinner({ size = 60, className }: SpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary animate-spin m-auto", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
