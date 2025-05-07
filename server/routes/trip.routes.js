import express from "express"; 
import {verifyToken} from "../middleware/auth.js"
import {createTrip,getTripByID, getTrips, addUserToTrip, archiveTrip} from "../controllers/trip.controller.js"

const router = express.Router(); 
router.post("/trips", verifyToken, createTrip); 
router.get("/trips", verifyToken, getTrips); 
router.get("/trips/:tripId", verifyToken, getTripByID); 
router.patch('/trips/:tripId/add-user', verifyToken,addUserToTrip); 
router.patch('/trips/:tripId/change-status', verifyToken, addUserToTrip); 
router.patch('/trips/:tripId/archive-trip', verifyToken, archiveTrip)
export default router; 

