import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import EditableText from "@/components/ui/EditableText";
import Spinner from "@/components/ui/Spinner";
import { MOCK_TRIP_DETAILS } from "@/mock/mock-trip-details";
import { TripDetails } from "@/types/TripDetails";
import TextArea from "@/components/ui/TextArea";
import { useNavigate } from "react-router";
import BigBox from "@/components/my-trip/BigBox";

export default function MyTripView() {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    name: "My Trip",
    destinations: [],
    collaborators: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const goToDashboard = () => navigate("/dashboard");

  // Save name to tripDetails when user stops editing
  const handleSaveName = (name: string) =>
    setTripDetails((prev: TripDetails) => ({
      ...prev,
      name,
    }));

  // Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      setTimeout(() => {
        setTripDetails(MOCK_TRIP_DETAILS);
        setIsLoading(false);
      }, 100);
    };

    fetchTripDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-5 w-full h-full justify-center">
          <div className="self-center flex gap-5 mx-3 my-5">
            <EditableText
              onSave={handleSaveName}
              iconSize={24}
              className="text-3xl text-center font-bold text-primary"
            >
              {tripDetails?.name}
            </EditableText>
          </div>
          <BigBox>
            <Card
              title="Destination"
              className="flex flex-col w-full p-4 bg-primary-container text-on-primary-container"
            >
              <TextArea
                placeholder="oh, the places you'll go!"
                className="min-h-24"
              />
            </Card>
            <Card
              title="Dates"
              className="flex flex-col w-full p-4 bg-primary-container text-on-primary-container"
            >
              <TextArea
                placeholder="scribble down a few dates and see what sticks"
                className="min-h-24"
              />
            </Card>
            <Card
              title="Collaborators"
              className="flex flex-col w-full p-4 bg-primary-container text-on-primary-container"
            >
              <TextArea
                placeholder="who are your travel buddies?"
                className="min-h-24"
              />
            </Card>
          </BigBox>
          <div className="self-end flex gap-2">
            <Button
              onClick={goToDashboard}
              className="text-on-error bg-error hover:bg-error/80"
            >
              Delete Trip
            </Button>
            <Button
              onClick={goToDashboard}
              variant="secondary"
              className="text-on-secondary"
            >
              End Trip
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
