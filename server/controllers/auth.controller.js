import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const googleAuthCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOneAndUpdate(
      { googleId: profile.id },
      { displayName: profile.displayName },
      { upsert: true, new: true }
    );
    return done(null, user);
  } catch (error) {
    console.error("Google auth failed:", error);
    return done(error, null);
  }
};

export const issueTokenAndRedirect = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user._id, name: user.displayName },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  const clientUrl = process.env.CLIENT_URL;
  const redirectUrl = `${clientUrl}/auth/callback?token=${token}`;
  res.redirect(redirectUrl);
};

export const logoutUser = (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.CLIENT_URL}/`);
  });
};
