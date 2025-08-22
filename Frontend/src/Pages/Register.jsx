import { useNavigate } from "react-router-dom";
import StepProgress from "../components/StepProgress";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/registerActions";
import PasswordRules from "@/components/passwordRules";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RegisterSchema from "@/components/RegisterSchema";
import FloatingInput from "@/components/FloatingInput";
// ✅ Reusable Floating Input

export default function Register({ setStep }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { loading, error, success } = useSelector(
    (state) => state.register || {}
  );

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
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values, { resetForm }) => {
          dispatch(registerUser(values))
            .unwrap()
            .then(() => {
              toast.success("Registration successful! Redirecting...");
              setStep(2)
              navigate("/verify-email");
            })
            .catch((err) => {
              toast.error(err?.message || "Registration failed");
              resetForm();
            });
        }}
      >
          {({ values, isSubmitting, resetForm }) => {
            // 🔹 Handle Redux error updates as well
            useEffect(() => {
              if (error) {
                toast.error(error);
                dispatch({ type: "RESET_OTP_STATE" });
                resetForm();
              }
            }, [error, dispatch, resetForm]);

            return (
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

                {/* Password Rules */}
                {passwordFocused && <PasswordRules password={values.password} />}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                >
                  {loading || isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}


