const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// ---------- Middleware ----------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------- MongoDB ----------

mongoose.connect(process.env.MONGO_URI);
const User = require("./models/User");

// ---------- Passport Config ----------
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOneAndUpdate(
    { googleId: profile.id },
    { displayName: profile.displayName },
    { upsert: true, new: true }
  );
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ---------- Auth Routes ----------
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));


app.get("/auth/google/callback",
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








// ---------- Start Server ----------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
