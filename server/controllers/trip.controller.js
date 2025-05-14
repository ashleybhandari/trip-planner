import slugify from "slugify";
import { nanoid } from "nanoid";
import Trip from "../models/Trip.js";
import { sendInviteEmail } from "../services/emailService.js";
import jwt from "jsonwebtoken";

// ---------- API calls for Trips ----------
export const createTrip = async (req, res) => {
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
      users: [userId],
      status: true,
    });

    await newTrip.save();
    for (const email of collaboratorEmails) {
      await sendInviteEmail(email, newTrip._id.toString());
    }
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
    const trips = await Trip.find({ users: userId }).populate(
      "users",
      "name email"
    );

    res.json(trips);
  } catch (err) {
    console.error("Error fetching user's trips:", err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

export const deleteTrip = async (req, res) => {
  const userId = req.user.id;
  const { slug } = req.params;
  try {
    const trip = await Trip.findOne({ tripSlug: slug });

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const isUserInTrip = trip.users.some((user) => user.toString() === userId);
    if (!isUserInTrip) {
      return res
        .status(403)
        .json({ error: "Access denied: not a member of this trip" });
    }

    await Trip.deleteOne({ _id: trip._id });

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.error("Error deleting trip:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// check trip exists
export const getTripByID = async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user.id;

  try {
    const trip = await Trip.findById(tripId).populate("users", "name email");

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const isUserInTrip = trip.users.some(
      (user) => user._id.toString() === userId
    );
    if (!isUserInTrip) {
      return res
        .status(403)
        .json({ error: "Access denied: not a member of this trip" });
    }

    res.json(trip);
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
};

export const changeTripStatus = async (req, res) => {
  const { slug } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const isUserInTrip = trip.users.some((user) => user.toString() === userId);
    if (!isUserInTrip) {
      return res
        .status(403)
        .json({ error: "Access denied: not a member of this trip" });
    }

    trip.status = false;
    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error("Error updating trip status:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// controllers/trip.controller.js
export const addUserToTrip = async (req, res) => {
  const userId = req.user.id;
  const { inviteToken } = req.body;

  try {
    const decoded = jwt.verify(inviteToken, process.env.JWT_SECRET);
    const { tripId } = decoded;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const alreadyExists = trip.users.some((user) => user.toString() === userId);
    if (alreadyExists)
      return res.status(400).json({ error: "User already in trip" });

    trip.users.push(userId);
    await trip.save();

    res.status(200).json(trip);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateSummaryField = async (req, res) => {
  const { slug } = req.params;
  const { field, value } = req.body;
  const userId = req.user.id;
  const allowedFields = ["destination", "dates", "collaborators", "name"];
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ error: "Invalid field" });
  }

  try {
    const trip = await Trip.findOneAndUpdate(
      { tripSlug: slug },
      { $set: { [field]: value } },
      { new: true }
    );
    console.log("debounce", trip.collaborators);

    if (!trip) return res.status(404).json({ error: "Trip not found" });
    const isUserInTrip = trip.users.some(
      (user) => user._id.toString() === userId
    );
    if (!isUserInTrip) {
      return res
        .status(403)
        .json({ error: "Access denied: not a member of this trip" });
    }
    res.status(201);
  } catch (err) {
    console.error("Error updating destination:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getSummary = async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;
  try {
    const trip = await Trip.findOne({ tripSlug: slug }).populate(
      "users",
      "name email"
    );

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const isUserInTrip = trip.users.some(
      (user) => user._id.toString() === userId
    );
    if (!isUserInTrip) {
      return res
        .status(403)
        .json({ error: "Access denied: not a member of this trip" });
    }
    res.json({
      tripId: slug,
      collaborators: trip.collaborators,
      destination: trip.destination,
    });
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
};
