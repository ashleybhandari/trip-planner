type BigBoxProps = {
  children: React.ReactNode;
};

export default function BigBox({ children }: BigBoxProps) {
  return (
    <div
      className="relative border rounded-md border-outline/40 p-4 w-full max-w-[900px] mx-auto bg-transparent"
    >
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
