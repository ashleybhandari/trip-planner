type BigBoxProps = {
    children: React.ReactNode; // Allow any child components to be placed inside
  };
  
  export default function BigBox({ children }: BigBoxProps) {
    return (
      <div className="border-2 border-black p-4 w-[900px] h-[550px] mx-auto mt-8 block bg-transparent">
        {/* Render child components (green boxes inside) */}
        <div className="flex flex-col gap-4">
        {children}
        </div>

      </div>
    );
  }
  