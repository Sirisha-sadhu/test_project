import axios from 'axios';
const token = JSON.parse(localStorage.getItem("register"));

export const SET_FILE = "SET_FILE";
export const CLEAR_FILES = "CLEAR_FILES";
export const KYC_REQUEST = 'kyc verification request';
export const KYC_SUCCESS = 'kyc verification success';
export const KYC_PENDING = 'kyc verification pending';
export const KYC_FAILURE = 'kyc verification failure';
 
export const setFile = (key, file) => ({
  type: SET_FILE,
  payload: { key, file },
});

export const clearFiles = () => ({ type: CLEAR_FILES });
export const resetKyc = () => ({ type: KYC_RESET });


// Thunk to submit KYC documents
export const submitKycDocuments = (files) => async(dispatch)=>{
    dispatch({type: KYC_REQUEST})
    try{
        const formData = new FormData()
        formData.append("passportFront", files.passportFront)
        formData.append("passportBack", files.passportBack)
        formData.append("emirates", files.emirates)

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/kyc/submit-documents`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('kyc response', response.data)
        if(response.data.success){
            dispatch({
                type: 'KYC_SUCCESS',
                payload: response.data
            })
            const socket = io("http://localhost:8001");

            // Register this user (so backend can target events)
            socket.emit("registerUser", response.data.userId);

            // Listen for admin decision
            socket.on("kycStatusUpdated", (data) => {
            console.log("KYC Status from admin:", data);

            if (data.status === "approved") {
                dispatch({ type: "KYC_APPROVED" });
                socket.disconnect(); // ✅ Done, disconnect
            } else if (data.status === "rejected") {
                dispatch({ type: "KYC_REJECTED", payload: data.reason });
                socket.disconnect(); // ✅ Done, disconnect
            }
        });
        }

    }
    catch(err){
        console.log(err)
        dispatch({
            type: KYC_FAILURE,
            payload: err.response?.data?.message || "KYC submission failed",
        });
    }
}