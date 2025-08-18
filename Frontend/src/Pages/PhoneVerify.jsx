import FloatingInput from "@/components/FloatingInput";
import StepProgress from "@/components/StepProgress";
import { sendPhoneOtp, verifyPhoneOtp } from "@/redux/actions/otpActions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PhoneVerify = ({setStep, user}) => {
    const [otpVisible, setOtpVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [verifyDisabled, setVerifyDisabled] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, success} = useSelector((state) => state.otp || {});

    useEffect(() => {
        // Reset error when component mounts
        if (error) {
          toast.error(error);
        }
        if(success){
          toast.success("Successfull Mobile Verification! Redirecting to KYC verification...");
        }
      }, [ error, success]);

    const handleVerify = () => {
        dispatch(sendPhoneOtp())
        setOtpVisible(true);
        setVerifyDisabled(true);
        // Here you can trigger your email OTP send logic
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Handle OTP verification logic here
        dispatch(verifyPhoneOtp(otp))
        .then(() => {
            setStep(4); // Assuming step 4 is the next step after phone verification
            navigate("/kyc"); // Navigate to KYC page
        });
    };

    return (
        <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-gradient-to-br from-blue-100 to-purple-200">
            <StepProgress currentStep={3} />
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 mt-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Phone Verification</h2>                
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <FloatingInput label="Phone" type="tel" name="phoneNumber" value={user?.countryCode +" "+ user?.phoneNumber} placeholder='Phone'/>
                    <button type="button"
                        className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition-colors duration-200 ${
                        verifyDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "hover:bg-blue-700"
                        }`}
                        onClick={handleVerify}>
                            Verify
                    </button>
                
                {otpVisible && (
                    <>
                    <FloatingInput label="OTP" type="text" name="OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='OTP'/>
                    <button
                        type="submit"
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

export default PhoneVerify;