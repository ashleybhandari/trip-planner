import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const sendInviteEmail = async (email, tripId) => {
  const token = jwt.sign({ tripId }, process.env.JWT_SECRET, { expiresIn: "2d" });

  const inviteLink = `${process.env.CLIENT_URL}/trip/invite?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // app password
    },
  });

  const mailOptions = {
    from: `"TripPlanner" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "You're invited to join a trip!",
    html: `<p>You have been invited to join a trip. Click below to accept:</p>
           <a href="${inviteLink}">${inviteLink}</a>`,
  };

  const info=await transporter.sendMail(mailOptions);
  console.log(info);
};
