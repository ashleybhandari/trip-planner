import { BrowserRouter, Routes, Route } from "react-router";

import BudgetView from "@/views/BudgetView";
import ChecklistView from "@/views/ChecklistView";
import ItineraryView from "@/views/ItineraryView";
import LandingView from "@/views/LandingView";
import MapView from "@/views/MapView";
import MyTripView from "@/views/MyTripView";
import TripLayoutView from "@/components/layout/TripLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthCallbackView from "@/views/AuthCallbackView";
import DashboardView from "./views/DashboardView";
import InviteView from "./views/TripInviteView";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/auth/callback" element={<AuthCallbackView />} />
        <Route element={<ProtectedRoute />}>
        {/* add all protected routes here */}
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="trip/:tripSlug" element={<TripLayoutView />}>
          <Route path="summary" element={<MyTripView />} />
          <Route path="itinerary" element={<ItineraryView />} />
          <Route path="map" element={<MapView />} />
          <Route path="budget" element={<BudgetView />} />
          <Route path="checklist/:checklistId" element={<ChecklistView />} />
          
        </Route>
        <Route path="/trip/invite" element={<InviteView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
