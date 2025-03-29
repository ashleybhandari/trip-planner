import { BrowserRouter, Routes, Route } from "react-router";

import BudgetView from "@/views/BudgetView";
import ChecklistView from "@/views/ChecklistView";
import ItineraryView from "@/views/ItineraryView";
import LandingView from "@/views/LandingView";
import MapView from "@/views/MapView";
import MyTripView from "@/views/MyTripView";
import TripLayoutView from "@/components/layout/TripLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="trip/:tripId" element={<TripLayoutView />}>
          <Route path="summary" element={<MyTripView />} />
          <Route path="itinerary" element={<ItineraryView />} />
          <Route path="map" element={<MapView />} />
          <Route path="budget" element={<BudgetView />} />
          <Route path="checklist/:checklistId" element={<ChecklistView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
