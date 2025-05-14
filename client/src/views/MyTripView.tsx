import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import EditableText from "@/components/ui/EditableText";
import Spinner from "@/components/ui/Spinner";
import { MOCK_TRIP_DETAILS } from "@/mock/mock-trip-details";
import { TripDetails } from "@/types/TripDetails";
import TextArea from "@/components/ui/TextArea";
import { useNavigate } from "react-router";
import BigBox from "@/components/my-trip/BigBox";
import { useParams } from "react-router";
import debounce from "lodash/debounce";
import { fetchSummary, updateSummaryField } from "@/api/my-trip-summary"; 
import { deleteTrip, endTrip } from "@/api/trip-actions";

export default function MyTripView() {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    name: "My Trip",
    destinations: [],
    collaborators: [],
    
  });
  const [isLoading, setIsLoading] = useState(true); 
  const [destinationText, setDestinationText] = useState("");
  // const [datesText, setDatesText] = useState("");
  const [collaboratorsText, setCollaboratorsText] = useState("");
  
  // const { tripId } = useParams();  
  const { tripSlug } = useParams<{ tripSlug: string }>();
  // const tripSlug= tripId;

  const navigate = useNavigate();

  const goToDashboard = () => navigate("/dashboard");

  // Save name to tripDetails when user stops editing
  const handleSaveName = (name: string) =>
    setTripDetails((prev: TripDetails) => ({
      ...prev,
      name,
    }));

  // Fetch trip details
  // useEffect(() => {
  //   const fetchTripDetails = async () => {
  //     setTimeout(() => {
  //       setTripDetails(MOCK_TRIP_DETAILS);
  //       setIsLoading(false);
  //     }, 100);
  //   };

  //   fetchTripDetails();
  // }, []); 
  const handleDeleteTrip = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteTrip(tripSlug, token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete trip:", err);
      alert("Unable to delete trip.");
    }
  }; 

  const handleEndTrip = async () => {
    try {
      const token = localStorage.getItem("token");
      await endTrip(tripSlug, token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to end trip:", err);
      alert("Unable to end trip.");
    }
  }; 
  

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchSummary(tripSlug, token);
        setTripDetails(data);
        setDestinationText(data.destination || "");
        // setDatesText(data.dates || "");
        setCollaboratorsText(data.collaborators || "");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrip();
  }, [tripSlug]);

  const debouncedSave = useCallback(
    debounce(async (field: string, value: string) => {
      try { 
        const token = localStorage.getItem("token");
        await updateSummaryField(tripSlug, field, value, token);
      } catch (err) {
        console.error(err);
      }
    }, 500),
    [tripSlug]
  ); 

  useEffect(() => {
    if (!isLoading) debouncedSave("destination", destinationText);
  }, [destinationText]);

  useEffect(() => {
    if (!isLoading) debouncedSave("collaborators", collaboratorsText);
  }, [collaboratorsText]);


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
              className="flex flex-col w-full p-4"
            >
              <TextArea
                value={destinationText}
                onChange={(e) => setDestinationText(e.target.value)}
                placeholder="oh, the places you'll go!"
                className="min-h-24"
              />
            </Card>
            <Card
              title="Dates"
              className="flex flex-col w-full p-4"
            >
              <TextArea
                placeholder="scribble down a few dates and see what sticks"
                className="min-h-24"
              />
            </Card>
            <Card
              title="Collaborators"
              className="flex flex-col w-full p-4"
            >
              <TextArea
               value={collaboratorsText}
               onChange={(e) => setCollaboratorsText(e.target.value)}
                placeholder="who are your travel buddies?"
                className="min-h-24"
              />
            </Card>
          </BigBox>
          <div className="self-end flex gap-2">
            <Button
              onClick={handleDeleteTrip}
              className="text-on-error bg-error hover:bg-error/80"
            >
              Delete Trip
            </Button>
            <Button
              onClick={handleEndTrip}
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
