import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '587',
  secure: false,
  auth: {
    user: process.env.EMAIL_USER_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
