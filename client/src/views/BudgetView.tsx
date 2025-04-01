import { useEffect, useState } from "react";
import TripCard from "@/components/mytrip/TripCard";
import BigBox from "@/components/mytrip/BigBox";
import { Button } from "@/components/ui/button";

type Budget = {
  name: string;
  details: string;
};

export default function MyTripView() {
  const [budget, setBudget] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      setTimeout(() => {
        const fetchedBudget: Budget[] = [
          { name: "Budget Overview:", details: "" },
          { name: "Expense List:", details: "" },
          { name: "Amount to Pay:", details: "" },
        ];
        setBudget(fetchedBudget);
        setLoading(false);
      }, 1000);
    };

    fetchBudgetDetails();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 py-6 sm:px-6 lg:px-8">
      {/* TripCard with responsive width */}
      <TripCard
        tripName="EXPENSES"
        width="w-full sm:w-[800px] md:w-[900px]"
        style={{ color: 'var(--color-primary-fixed)' }} // Apply color here to the text
      />

      {/* BigBox with responsive width */}
      <BigBox width="w-full sm:w-[800px] md:w-[900px]">
        {loading ? (
          <p>Loading budget details...</p>
        ) : budget.length > 0 ? (
          budget.map((budget, index) => (
            <div
              key={index}
              className="flex flex-col w-full p-4 rounded-lg shadow-md mb-4"
              style={{
                backgroundColor: 'var(--color-tertiary-fixed)', 
              }}
            >
              <h3 className="font-bold">{budget.name}</h3>
              <p className="break-words">{budget.details}</p>
            </div>
          ))
        ) : (
          <p>No budget details available.</p>
        )}

        {/* Buttons inside BigBox, aligned to the bottom */}
        <div className="flex justify-end gap-4 p-4 sm:fixed sm:bottom-4 sm:right-4 sm:w-[auto]">
          <Button className="bg-[var(--color-on-primary-container)] text-white hover:bg-opacity-80">
            ADD NEW EXPENSE
          </Button>
        </div>
      </BigBox>
    </div>
  );
}
