const nodemailer = require('nodemailer');
const crypto = require("crypto");

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

module.exports = { sendOTPEmail };
