const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const port = process.env.PORT; // or any other port you prefer

app.use(bodyParser.json());

app.post('/sendOtp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Create a transporter with your email service details
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use the appropriate email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
          text-align: center;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h2 {
          color: #007bff;
        }
    
        .verification-code {
          color: #007bff;
          font-size: 36px;
          margin: 20px 0;
        }
    
        .expire-message {
          color: #dc3545;
          margin-top: 10px;
        }
    
        .notice {
          color: #28a745;
          margin-top: 10px;
        }
    
        .support-info {
          margin-top: 20px;
        }
    
        .contact-link {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h2>Home Hub Email Verification</h2>
        <p>Dear User,</p>
        <p>Your verification code for Home Hub is:</p>
        <h1 class="verification-code">{{OTP}}</h1>
        <p class="expire-message">This code will expire in 5 minutes.</p>
        <p class="notice">Please do not share this code with anyone for security reasons.</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <div class="support-info">
          <p>Contact us at: <a class="contact-link" href="mailto:support@homehub.com">support@homehub.com</a></p>
        </div>
        <p>Thank you for choosing Home Hub!</p>
      </div>
    </body>
    
    </html>
    
`;

    // Email content
    const mailOptions = {

      from: 'zsp.bhavik@gmail.com',
      to: email,
      subject: 'OTP Verification',
      html: htmlContent.replace('{{OTP}}', otp),
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });


    

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
