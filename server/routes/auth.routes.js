import express from "express";
import passport from "passport";
import pkg from "passport-google-oauth20";
import User from "../models/User.js"; 
import { googleAuthCallback, issueTokenAndRedirect, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();
const GoogleStrategy = pkg.Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, googleAuthCallback));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/" }), issueTokenAndRedirect);
router.get("/logout", logoutUser);

export default router;
