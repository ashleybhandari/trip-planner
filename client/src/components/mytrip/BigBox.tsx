type BigBoxProps = {
  children: React.ReactNode;
};

export default function BigBox({ children }: BigBoxProps) {
  return (
    <div
      className="relative border-2 border-black p-4 w-full max-w-[900px] h-auto sm:h-[550px] mx-auto mt-8 bg-transparent"
    >
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
