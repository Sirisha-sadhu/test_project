const nodemailer = require('nodemailer');
const crypto = require("crypto");
const twilio = require('twilio');
const { send } = require('process');

// Generate a random 6-digit OTP
const generateOTP = () => {
  // generate a otp of 4digit number
  const otp = crypto.randomInt(1000, 9999);
  return otp;
};

// Send OTP email
async function sendOTPEmail(toEmail) {
    console.log(toEmail);
    const otp = generateOTP();

    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email_id,
            pass: process.env.email_password // 16-char app password from Google
    }
    });

    const mailOptions = {
        from: `"test project" <${process.env.email_id}>`,
        to: toEmail,
        subject: 'Email Verification OTP ',
        text: `Your OTP for email verification is: ${otp}`,
        html: `<p>Your OTP for email verification is: <b>${otp}</b></p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return otp; // Return OTP for further verification
    } catch (error) {
        throw new Error('Failed to send OTP email: ' + error.message);
    }
}

const sendOTPPhone = async (phoneNumber) => {
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const phoneOtp = generateOTP();

    await client.messages.create({
        body: `Your OTP for phone verification is: ${phoneOtp}`,
        from: process.env.TWILIO_PHONE_NUMBER || +15158525571, // Your Twilio phone number
        to: phoneNumber,
    });

    console.log(`OTP sent to ${phoneNumber}: ${phoneOtp}`);
    return phoneOtp; // Return OTP for further verification
}

module.exports = { sendOTPEmail, sendOTPPhone };
