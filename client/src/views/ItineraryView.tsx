import { cn } from "@/lib/utils";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import PageSection from "@/components/itinerary/PageSection";
import TextArea from "@/components/itinerary/TextArea";

export default function ItineraryView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const headerClasses = "font-bold text-primary mb-2";

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full h-full p-3">
      <div className="flex flex-col min-[550px]:flex-row md:flex-col gap-3">
        <PageSection>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="lg:px-7 lg:py-4"
          />
        </PageSection>
        <PageSection className="grow px-4 py-2 flex flex-col">
          <h2 className={cn("text-lg", headerClasses)}>notes</h2>
          <TextArea
            placeholder="important notes for the day"
            className="grow"
          />
        </PageSection>
      </div>
      <PageSection className="grow px-4 py-2 flex flex-col">
        <h2 className={cn("text-2xl", headerClasses)}>
          {date?.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <TextArea placeholder="what are your plans?" className="grow" />
      </PageSection>
    </div>
  );
}
