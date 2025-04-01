import express from "express"; 
import mongoose from "mongoose"; 
import bodyParser  from "body-parser";
import session from "express-session"
import passport from "passport";
import pkg from "passport-google-oauth20";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { nanoid } from 'nanoid';
import { customAlphabet } from "nanoid"; 
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js"; 
import Trip from "./models/Trip.js"; 
import {Checklist, ChecklistItem} from "./models/Checklist.js";
import { BudgetItem } from "./models/Budget.js";

const app = express();
const server = http.createServer(app);
const GoogleStrategy = pkg.Strategy; 
dotenv.config();

// ---------- Middleware ----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ---------- MongoDB ----------

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectMongoDB();

// ---------- Passport Config ----------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        { displayName: profile.displayName },
        { upsert: true, new: true }
      );
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ---------- Auth Routes ----------
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, name: user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    // console.log(token)
    const clientUrl = process.env.CLIENT_URL;
    const redirectUrl = `${clientUrl}/auth/callback?token=${token}`;
    // console.log("Redirecting to:", redirectUrl);
    res.redirect(redirectUrl);
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    const clientUrl = process.env.CLIENT_URL;
    res.redirect(`${clientUrl}/`);
  });
});

//Token verificatiom 

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}


// ---------- API calls for Trips ----------
app.post("/api/trips", verifyToken, async (req, res) => {
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
      users:[userId]
    });

    await newTrip.save();
    res.status(201).json(newTrip);

  } catch (err) {
    console.error("Error creating trip:", err);
    res.status(500).json({ error: "Failed to create trip" });
  }
});

app.get("/api/trips", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Find trips where user is a member
    const trips = await Trip.find({ users: userId }).populate("users", "name email");

    res.json(trips);
  } catch (err) {
    console.error("Error fetching user's trips:", err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});



// check trip exists 
app.get("/api/trips/:tripId", verifyToken, async (req, res) => {
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
});

// ---------- API calls for Budget  ----------
app.get("/api/trip/slug/:slug/budget", verifyToken, async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 3. Fetch and return budget items
    const { budget } = await Trip.findOne({ tripSlug: slug }).populate("budget");
    res.json(budget);
  
  } catch (err) {
    console.error("Error fetching budget:", err);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/api/trip/slug/:slug/budget", verifyToken, async (req, res) => {
  const { slug } = req.params;
  const userId = req.user.id;
  const { expense, date, amount, paidBy = [] } = req.body;

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 3. Fetch and return budget items

    const budgetItem = new BudgetItem({ expense:expense, date: date, amount: Number(amount), paidBy: paidBy}); 
    console.log(checklist);
    // await checklistItem.save(); 
    await budgetItem.save();
   
    trip.budget.push(budgetItem._id);
    await trip.save();
  
    res.status(201).json(budgetItem);


  
  
  } catch (err) {
    console.error("Error adding budget item:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------- API calls for Checklist  ----------
app.get("/api/trip/slug/:slug/checklist/:checklist_id", verifyToken, async (req, res) => {
  const { slug, checklist_id } = req.params;
  const userId = req.user.id;

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if checklist_id matches the trip’s checklistId 
    const checklist = await Checklist.findById(checklist_id)   
    const isChecklistInTrip = trip.checklists.some(checklist => checklist.toString() === checklist_id);
    if (!isChecklistInTrip) {
      return res.status(403).json({ error: "Checklist does not belong to this trip" });
    }

    // 3. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 4. Fetch and return checklist
    // const checklist = await Checklist.findById(checklist_id).populate("items.assignedTo", "name email");
    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }
    
    res.json({ checklist });

  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/trip/slug/:slug/checklist/:checklist_id", verifyToken, async (req, res) => {
  const { slug, checklist_id } = req.params;
  const { label, assignedTo, checked=false} = req.body;
  const userId = req.user.id;
  console.log(slug);

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if checklist_id matches the trip’s checklistId 
    const checklist = await Checklist.findById(checklist_id)
    const isChecklistInTrip = trip.checklists.some(checklist => checklist.toString() === checklist_id);
    // if (!trip.checklistId || trip.checklistId.toString() !== checklist_id) {
    //   return res.status(403).json({ error: "Checklist does not belong to this trip" });
    // } 
    console.log(isChecklistInTrip);
    if (!isChecklistInTrip) {
      return res.status(403).json({ error: "Checklist does not belong to this trip" });
    }

    // 3. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }

    const checklistItem = new ChecklistItem({ label:label, assignedTo: assignedTo, checked: checked}); 
    console.log(checklist);
    // await checklistItem.save(); 
    
    console.log(`label: ${label}`); 
    checklist.items.push(checklistItem);
    await checklist.save();
  
    res.status(201).json(checklistItem);

  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.delete("/api/trip/slug/:slug/checklist/:checklist_id/item/:checklist_item_id", verifyToken, async (req, res) => {
  const { slug, checklist_id, checklist_item_id } = req.params;
  const userId = req.user.id;
  console.log(slug);

  try {
    // 1. Find the trip
    const trip = await Trip.findOne({ tripSlug: slug });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // 2. Check if checklist_id matches the trip’s checklistId 
    const checklist = await Checklist.findById(checklist_id)
    const isChecklistInTrip = trip.checklists.some(checklist => checklist.toString() === checklist_id);
    // if (!trip.checklistId || trip.checklistId.toString() !== checklist_id) {
    //   return res.status(403).json({ error: "Checklist does not belong to this trip" });
    // } 
    console.log(isChecklistInTrip);
    if (!isChecklistInTrip) {
      return res.status(403).json({ error: "Checklist does not belong to this trip" });
    }

    // 3. Check if current user is part of the trip
    const isUserInTrip = trip.users.some(user => user.toString() === userId);
    if (!isUserInTrip) {
      return res.status(403).json({ error: "Access denied" });
    }
    await Checklist.findByIdAndUpdate(checklist_id, {
      $pull: {
        items: { _id: checklist_item_id }
      }
    });
    
  
    res.status(201).json({ response: "Success" });

  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//create empty checklist 
app.post("/api/trips/slug/:slug/checklists", verifyToken, async (req, res) => {
    const { slug } = req.params;
    const userId = req.user.id;
    const { name } = req.body;
   
    const baseSlug = slugify(name, { lower: true });
    const checklistSlug = `${baseSlug}-${nanoid()}`;
     
    const trip = await Trip.findOne({ tripSlug: slug });
    console.log(trip); 
    
    if (!trip) return res.status(404).json({ error: "Trip not found" });
  
    const isMember = trip.users.some(u => u.toString() === userId);
    if (!isMember) return res.status(403).json({ error: "Access denied" });
  
    const checklist = new Checklist({ name:name, items: [], checklistSlug: checklistSlug}); 
    console.log(checklist);
    await checklist.save();
  
    trip.checklists.push(checklist._id);
    await trip.save();
  
    res.status(201).json(checklist);
  });
  
// get all checklists associated with a trip 

app.get("/api/trips/slug/:slug/checklists", verifyToken, async (req, res) => {
    const { slug } = req.params;
    const userId = req.user.id;

    try{
        const trip= await Trip.findOne({ tripSlug: slug}).populate({
            path:"checklists", 
            select:"name", 
        }); 
        if (!trip) return res.status(404).json({ error: "Trip not found" });
        console.log(trip);
        const isMember= trip.users.some(user=>user.toString()===userId);
        if(!isMember)
        {
            return res.status(403).json({ error: "Access denied: not a trip member" });
        }

        res.json(trip.checklists);
    }catch(err){
        res.status(500).json({ error: "Server error" });
    }
  
   
  });
  


// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
