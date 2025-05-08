import express from "express"; 
import {verifyToken} from "../middleware/auth.js"
import {createTrip,getTripByID, getTrips, addUserToTrip,updateSummaryField, getSummary,deleteTrip,changeTripStatus} from "../controllers/trip.controller.js"

const router = express.Router(); 
router.post("/trips", verifyToken, createTrip); 
router.get("/trips", verifyToken, getTrips); 
router.get("/trips/:tripId", verifyToken, getTripByID); 
router.delete("/trip/slug/:slug", verifyToken, deleteTrip); 
router.get("/trip/slug/:slug/summary",verifyToken, getSummary);
router.patch('/trip/invite', verifyToken,addUserToTrip); 
router.patch('/trip/slug/:slug/change-status', verifyToken, changeTripStatus); 
router.patch('/trip/slug/:slug/summary', verifyToken,updateSummaryField); 
export default router; 

