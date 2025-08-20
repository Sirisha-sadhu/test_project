import { useNavigate } from "react-router-dom";
import StepProgress from "../components/StepProgress";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/registerActions";
import PasswordRules from "@/components/passwordRules";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// ✅ Reusable Floating Input with Formik + "value-aware" floating label
const FloatingInput = ({ label, type, name, value, ...props }) => {
  const isActive = value && value.length > 0; // keeps label up if there's data

  return (
    <div className="relative w-full">
      <Field
        type={type}
        name={name}
        placeholder=" "
        {...props}
        className="peer w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        className={`absolute left-4 px-1 bg-white transition-all
          ${isActive
            ? "-top-2.5 text-sm text-blue-500"
            : "top-2 text-gray-400 text-base"}
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500`}
      >
        {label}
      </label>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};


// ✅ Yup Validation Schema
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .required("Last name is required"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  countryCode: Yup.string().required("Country code is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register({ setStep }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordFocused, setPasswordFocused] = useState(false);


  // Optional: Get loading/error states from Redux
  const { loading, error, success} = useSelector((state) => state.register || {});
  console.log("Register page userInfo:", success, loading, error);

  useEffect(() => {
    // Reset error when component mounts
    if (error) {
      toast.error(error);
    }
    if(success){
      toast.success("Registration successful! Redirecting to email verification...");
      setStep(2); // Assuming step 2 is the next step after registration
      navigate("/verify-email"); // Navigate to email verification page
    }
  }, [ error, success]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-6">
      <StepProgress currentStep={1} />
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 mt-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            dob: "",
            gender: "",
            countryCode: "+91",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            dispatch(registerUser(values))
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-4">
              {/* First & Last Name */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FloatingInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                />
                <FloatingInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                />
              </div>

              {/* DOB & Gender */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FloatingInput
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={values.dob}
                />
                <div className="relative w-full">
                  <Field
                    as="select"
                    name="gender"
                    className="peer w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="" hidden></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <label
                    className={`absolute left-4 px-1 bg-white transition-all ${
                      values.gender
                        ? "-top-2.5 text-sm text-blue-500"
                        : "top-2 text-gray-400 text-base"
                    } peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500`}
                  >
                    Gender
                  </label>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Email */}
              <FloatingInput
                label="Email Address"
                type="email"
                name="email"
                value={values.email}
              />

              {/* Country Code + Phone */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Field
                  as="select"
                  name="countryCode"
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+971">🇦🇪 +971</option>
                </Field>
                <ErrorMessage
                  name="countryCode"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <FloatingInput
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  value={values.phoneNumber}
                />
              </div>

              {/* Password & Confirm Password */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FloatingInput
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <FloatingInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                />
              </div>

              {/* Error message from backend */}
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              {/* Password Rules */}
              {passwordFocused &&
                <PasswordRules password={values.password} />
              }
              
              {/* Submit */}
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-50"
              >
                {loading || isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
