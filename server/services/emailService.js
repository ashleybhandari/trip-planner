require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,           // your email
    pass: process.env.GMAIL_APP_PASSWORD    // 16-char app password
  }
});

async function sendInviteEmail(toEmail, token) {
  const inviteLink = `https://your-react-app.com/invite?token=${token}`; // replace with your domain

  const mailOptions = {
    from: `"Trip Planner" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'You’re invited to join!',
    html: `
      <h3>Hello!</h3>
      <p>You’ve been invited to join our app. Click the link below to get started:</p>
      <a href="${inviteLink}">${inviteLink}</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invite sent to ${toEmail}`);
  } catch (err) {
    console.error('Error sending invite:', err);
  }
}

module.exports = { sendInviteEmail };
