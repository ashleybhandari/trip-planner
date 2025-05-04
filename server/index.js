import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


dotenv.config();


import authRoutes from "./routes/auth.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import checklistRoutes from "./routes/checklist.routes.js";

const app = express();
const server = http.createServer(app);

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

app.use("/auth", authRoutes); // handles /auth/google, /auth/logout, etc.
app.use("/api", tripRoutes);  // handles /api/trips, /api/trips/:tripId, etc.
app.use("/api", budgetRoutes);
app.use("/api", checklistRoutes);

// Server Start
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
