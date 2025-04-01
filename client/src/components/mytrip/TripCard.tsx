type TripCardProps = {
  tripName: React.ReactNode;
  width?: string;
  height?: string;
};

const defaultWidth = 'w-full sm:w-[900px] md:w-[1000px]';
const defaultHeight = 'h-auto sm:h-24';

export default function TripCard({
  tripName,
  width = defaultWidth,
  height = defaultHeight,
}: TripCardProps) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${width} ${height} mx-auto mt-8`}
      style={{ backgroundColor: 'var(--color-tertiary-container)' }}
    >
      <h2 className="text-xl font-bold text-center">{tripName}</h2>
    </div>
  );
}
