import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from 'react-router-dom';

interface ResetPasswordData {
  [key: string]: string | string[];
  newPassword: string;
  confirmPassword: string;
}

function ResetPassword() {
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<ResetPasswordData>>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResetPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: Partial<ResetPasswordData> = {};

    // Validate New Password
    if (!resetPasswordData.newPassword.trim()) {
      newErrors.newPassword = "Please enter your new password.";
      valid = false;
    }

    // Validate Confirm Password
    if (!resetPasswordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
      valid = false;
    } else if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle the password reset logic here
      console.log("Password reset successful!");
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
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                placeholder="Enter your New Password"
                type="password"
                id="newPassword"
                name="newPassword"
                value={resetPasswordData.newPassword}
                onChange={handleInputChange}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.newPassword ? 'border-red-500' : ''
                }`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                placeholder="Confirm your Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={resetPasswordData.confirmPassword}
                onChange={handleInputChange}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
           
            <button
              type="submit"
              className="bg-orange-700 text-white p-3 rounded-md w-full hover:bg-orange-800 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
            

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

export default ResetPassword;
