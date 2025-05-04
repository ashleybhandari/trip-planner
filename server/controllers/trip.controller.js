import slugify from "slugify";
import { nanoid } from 'nanoid';
import Trip from "../models/Trip.js"; 


// ---------- API calls for Trips ----------
export const createTrip= async(req, res) => {
  const { tripName, destinations, collaboratorEmails = [] } = req.body;
  const userId = req.user.id;

  try {
    // Generate a unique trip slug
    const baseSlug = slugify(tripName, { lower: true });
    const slug = `${baseSlug}-${nanoid()}`;

    // Find collaborators from emails
  //   const collaborators = await User.find({ email: { $in: collaboratorEmails } });
  //   const collaboratorIds = collaborators.map(user => user._id);

    // Create the trip
    const newTrip = new Trip({
      tripName,
      destinations,
      tripSlug: slug,
      // users: [userId, ...collaboratorIds]
      users:[userId], 
      active: true, 

    });

    await newTrip.save();
    res.status(201).json(newTrip);

  } catch (err) {
    console.error("Error creating trip:", err);
    res.status(500).json({ error: "Failed to create trip" });
  }
};

export const getTrips = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find trips where user is a member
    const trips = await Trip.find({ users: userId }).populate("users", "name email");

    res.json(trips);
  } catch (err) {
    console.error("Error fetching user's trips:", err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};



// check trip exists 
export const getTripByID= async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user.id;
  

  try {
    const trip = await Trip.findById(tripId).populate("users", "name email");

    // 🔒 Trip not found
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 🔒 User not in trip
    const isUserInTrip = trip.users.some(user => user._id.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied: not a member of this trip" });
    }

    res.json(trip);
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
};


export const changeTripStatus = async(req, res)=>{
const { tripId } = req.params;
const {status}= req.body;
const userId = req.user.id; 
try {
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { status },
      { new: true }
    );

    if (!trip) return res.status(404).json({ error: "Trip not found" });
    const isUserInTrip = trip.users.some(user => user._id.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied: not a member of this trip" });
    }

    res.json(trip);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Server error" });
  }
} 

// controllers/trip.controller.js
export const addUserToTrip = async (req, res) => {
    const { tripId } = req.params;
    const { userIdToAdd } = req.body;
  
    try {
      const trip = await Trip.findById(tripId);
      if (!trip) return res.status(404).json({ error: "Trip not found" });
  
      const alreadyExists = trip.users.some(user => user.toString() === userIdToAdd);
      if (alreadyExists) return res.status(400).json({ error: "User already in trip" });
  
      trip.users.push(userIdToAdd);
      await trip.save();
  
      res.status(200).json(trip);
    } catch (err) {
      console.error("Error adding user:", err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
