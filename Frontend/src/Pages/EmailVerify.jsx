import FloatingInput from "@/components/FloatingInput";
import StepProgress from "@/components/StepProgress";
import React, { useState } from "react";

const EmailVerify = (setStep) => {
    const [email, setEmail] = useState("");
    const [otpVisible, setOtpVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [verifyDisabled, setVerifyDisabled] = useState(false);

    const handleVerify = () => {
        setOtpVisible(true);
        setVerifyDisabled(true);
        // Here you can trigger your email OTP send logic
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Handle OTP verification logic here
        alert(`OTP Submitted`);
    };

    return (
        <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-gradient-to-br from-blue-100 to-purple-200">
            <StepProgress currentStep={2} />
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 mt-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Email Verification</h2>                
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <FloatingInput label="Email" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                    <button
                        className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition-colors duration-200 ${
                        verifyDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "hover:bg-blue-700"
                        }`}
                        onClick={handleVerify}
                        disabled={verifyDisabled || !email}>
                            Verify
                    </button>
                
                {otpVisible && (
                    <>
                    <FloatingInput label="OTP" type="text" name="OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='Enter OTP'/>
                    <button
                        className="w-full mt-4 py-2 px-4 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-200"
                        onClick={handleVerify}
                        disabled={!otp}>
                            Submit
                    </button>
                    </>
                 )}

                </form>
            </div>
        </div>
    );
};

export default EmailVerify;