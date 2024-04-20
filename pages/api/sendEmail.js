// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export default async (req, res) => {
  const { userName } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: 'qasimmalik808@gmail.com',
    to: 'qasimmalik808@gmail.com',
    subject: 'New Coffee Supporter!',
    text: `Hi, ${userName} has just supported your project by buying a cup of coffee!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Email could not be sent.");
    } else {
      return res.status(200).send("Email successfully sent.");
    }
  });
};
