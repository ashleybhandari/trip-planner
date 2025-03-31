type TripCardProps = {
    tripName: React.ReactNode; // Name of the trip
    width?: string; // Optional width prop (string type)
    height?: string; // Optional height prop (string type)
  };
  
  export default function TripCard({ tripName, width = 'w-[900px]', height = 'h-20' }: TripCardProps) {
    return (
      <div
        className={`p-4 rounded-lg shadow-md ${width} ${height} mx-auto mt-8`} // Apply dynamic width and height
        style={{ backgroundColor: "var(--color-tertiary-container)" }}
      >
        <h2 className="text-xl font-bold text-center">{tripName}</h2>
      </div>
    );
  }
  