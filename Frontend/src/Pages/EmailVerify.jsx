import FloatingInput from "@/components/FloatingInput";
import StepProgress from "@/components/StepProgress";
import { sendEmailOtp, verifyEmailOtp } from "@/redux/actions/otpActions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = ({setStep, user}) => {
    console.log("email verify ",user)
    const [otpVisible, setOtpVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [verifyDisabled, setVerifyDisabled] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { error, verified} = useSelector((state) => state.otp || {});

    useEffect(() => {
    if (user?.emailVerified) {
      navigate("/verify-phone"); // ✅ move to next step automatically
    }
    }, [user?.emailVerified, navigate]);


    useEffect(() => {
        // Reset error when component mounts
        if (error) {
            toast.error(error);
        }
        if(verified){
            toast.success("Successfull Email Verification! Redirecting to Mobile verification...");
            navigate("/verify-phone"); 
            setStep(3);
            dispatch({type: 'RESET_OTP_STATE'})
             // Assuming step 4 is the next step after phone verification
            
        }
      }, [ error, verified, setStep, navigate, dispatch]);


    const handleVerify = () => {
            dispatch(sendEmailOtp())
            .then(() => {
                toast.update("OTP sent to your email!");
            })
            setOtpVisible(true);
            setVerifyDisabled(true);
            // Here you can trigger your email OTP send logic
     };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Handle OTP verification logic here
        dispatch(verifyEmailOtp(otp))
         // Navigate to phone verification page
    };

    return (
        <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-gradient-to-br from-blue-100 to-purple-200">
            <StepProgress currentStep={2} />
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 mt-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Email Verification</h2>                
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <FloatingInput label="Email" type="email" name="email" value={user?.email}/>
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