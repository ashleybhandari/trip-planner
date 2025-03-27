import { BrowserRouter, Routes, Route } from "react-router";

import Budget from "@/views/Budget";
import Itinerary from "@/views/Itinerary";
import Landing from "@/views/Landing";
import Map from "@/views/Map";
import MyTrip from "@/views/MyTrip";
import TripLayout from "@/components/layout/TripLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="trip" element={<TripLayout />}>
          <Route index element={<MyTrip />} />
          <Route path="itinerary" element={<Itinerary />} />
          <Route path="map" element={<Map />} />
          <Route path="budget" element={<Budget />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
