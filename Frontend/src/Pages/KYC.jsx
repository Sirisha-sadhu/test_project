import { useState } from "react";
import StepProgress from "../components/StepProgress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setFile, submitKycDocuments } from "@/redux/actions/kycActions";


// 🔹 Component to preview uploaded file
const FilePreview = ({ file }) => {
  if (!file) return null;

  if (file.type === "application/pdf") {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm bg-gray-100 rounded-md">
        📄 {file.name}
      </div>
    );
  }

  return (
    <img
      src={URL.createObjectURL(file)}
      alt="Preview"
      className="w-full h-full object-contain rounded-md"
    />
  );
};


export default function KYC() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, verified } = useSelector((state) => state.kyc);
  
  useEffect(() => {
    // Reset error when component mounts
    if (error) {
      toast.error(error);
    }
    if(verified){
      setStep(4); // Assuming step 4 is the next step after phone verification
      navigate("/dashboard");
      toast.success("✅ KYC Submitted Successfully 🎉");
      toast.info("Wait for KYC to be verified")
    }
    }, [ error, verified, navigate, setStep]);

  const [files, setFiles] = useState({
    passportFront: null,
    passportBack: null,
    emirates: null,
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [field]: file });
      dispatch(setFile({ field, file }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!files.passportFront || !files.passportBack || !files.emirates) {
      toast.error("⚠️ Please upload all required documents.");
      return;
    }
    dispatch(submitKycDocuments(files));
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-purple-100">
      <StepProgress currentStep={4} />

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          KYC Verification
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Upload your documents to complete verification
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Grid layout to remove gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Proof of Identity (Front) */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Proof of Identity (Front)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg w-full h-52 overflow-hidden hover:border-blue-400 transition">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id="passportFront"
                  onChange={(e) => handleFileChange(e, "passportFront")}
                />
                <label htmlFor="passportFront" className="w-full h-full block cursor-pointer">
                  {files.passportFront ? (
                    <FilePreview file={files.passportFront} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Click to upload front side of ID
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Proof of Identity (Back) */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Proof of Identity (Back)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg w-full h-52 overflow-hidden hover:border-blue-400 transition">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id="passportBack"
                  onChange={(e) => handleFileChange(e, "passportBack")}
                />
                <label htmlFor="passportBack" className="w-full h-full block cursor-pointer">
                  {files.passportBack ? (
                    <FilePreview file={files.passportBack} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Click to upload back side of ID
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Proof of Address (Full width) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Proof of Address
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg w-full h-52 overflow-hidden hover:border-blue-400 transition">
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                id="emirates"
                onChange={(e) => handleFileChange(e, "emirates")}
              />
              <label htmlFor="emirates" className="w-full h-full block cursor-pointer">
                {files.emirates ? (
                  <FilePreview file={files.emirates} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Click to upload proof of address
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {loading? "Submitting...": 'Submit KYC'}
          </button>
        </form>
      </div>
    </div>
  );
}