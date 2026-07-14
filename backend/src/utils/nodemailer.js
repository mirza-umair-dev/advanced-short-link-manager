import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass:process.env.SMTP_PASSWORD ,
  },
});
const sendEmail = async (email, subject, html) => {
  try {
  await transporter.verify();
} catch (err) {
  console.error("SMTP verify failed:", err);
}
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject,
    html,
  });
};
export { transporter, sendEmail };
