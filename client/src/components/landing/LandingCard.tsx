type LandingCardProps = {
  children: React.ReactNode;
};

export default function LandingCard({ children }: LandingCardProps) {
  return (
    <div className="flex items-center justify-center md:w-56 lg:w-72 xl:w-96 h-52 p-12 text-2xl font-bold rounded-lg uppercase bg-secondary text-on-secondary">
      {children}
    </div>
  );
}
