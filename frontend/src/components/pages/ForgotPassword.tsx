import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from 'react-router-dom';

interface ForgotPasswordData {
  [key: string]: string | string[];
  email: string;
  otp: string;
}

function ForgotPassword() {
  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordData>({
    email: "",
    otp: "",
  });
  const [errors, setErrors] = useState<Partial<ForgotPasswordData>>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForgotPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: Partial<ForgotPasswordData> = {};

    // Validate phone number
    if (!forgotPasswordData.email.trim()) {
      newErrors.email = "Please enter your email.";
      valid = false;
    }

    // Validate OTP
    if (!forgotPasswordData.otp.trim()) {
      newErrors.otp = "Please enter your OTP.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      console.log("Forgot Password form submitted with data:", forgotPasswordData);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="md:flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home-left.jpeg')" }}
      ></div>

      <div
        className="md:flex-1 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/home-center.jpeg')" }}
      >
        <div className="bg-white p-8 rounded-3xl shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                placeholder="Enter your Email"
                type="text"
                id="email"
                name="email"
                value={forgotPasswordData.email}
                onChange={handleInputChange}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-600">
                OTP
              </label>
              <input
                placeholder="Enter your OTP"
                type="password"
                id="otp"
                name="otp"
                value={forgotPasswordData.otp}
                onChange={handleInputChange}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.otp ? 'border-red-500' : ''
                }`}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
              )}
            </div>

            <Link to="/reset-password">
             <button
              type="submit"
              className="bg-orange-700 text-white p-3 rounded-md w-full hover:bg-orange-800 focus:outline-none focus:ring focus:border-blue-300"
            >Submit
            </button>
            </Link>

            <div className="text-center mt-4">
              <Link to="/" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="md:flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/images/home-right.jpg')" }}>
      </div>
    </div>
  );
}

export default ForgotPassword;
