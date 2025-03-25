import { Button } from "@/components/ui/button";
import LandingCard from "@/components/landing/LandingCard";

export default function Landing() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-end gap-8 h-[40%] p-10 bg-primary">
        <h1 className="font-bold text-6xl text-on-primary">trip planner</h1>
        <Button
          variant="outline"
          className="text-lg md:text-xl w-fit h-fit border-none text-primary"
        >
          get started
        </Button>
      </div>
      <div className="grow flex flex-col items-center justify-evenly p-10 gap-10">
        <div className="flex flex-col md:flex-row gap-8">
          <LandingCard>Everyone's daily itinerary</LandingCard>
          <LandingCard>Everyone's maps and pins</LandingCard>
          <LandingCard>Everyone's budget and expenses</LandingCard>
        </div>
        <div className="text-3xl text-center font-bold text-secondary">
          all in just <span className="underline">one place</span>
        </div>
        <Button className="text-lg md:text-xl w-fit h-fit text-on-primary">
          get started
        </Button>
      </div>
    </div>
  );
}
