import { Button } from "@/components/ui/button";
import LandingCard from "@/components/landing/LandingCard";

/**
 * @returns Landing page
 */
export default function Landing() {
  return (
    <div>
      <div className="flex flex-col justify-end gap-8 h-72 md:h-84 p-10 bg-primary">
        <h1 className="font-bold text-6xl text-on-primary">trip planner</h1>
        <Button variant="outline" className="text-lg md:text-xl w-fit h-fit border-none text-primary">
          get started
        </Button>
      </div>
      <div className="flex flex-col items-center gap-12 p-10">
        <div className="flex flex-col md:flex-row gap-8">
          <LandingCard>Everyone's daily itinerary</LandingCard>
          <LandingCard>Everyone's maps and pins</LandingCard>
          <LandingCard>Everyone's budget and expenses</LandingCard>
        </div>
        <div className="text-3xl text-center font-bold text-secondary">
          all in just <span className="underline">one place</span>
        </div>
        <Button className="text-lg md:text-xl w-fit h-fit text-on-primary">get started</Button>
      </div>
    </div>
  );
}
