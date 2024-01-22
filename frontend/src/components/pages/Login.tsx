import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

// Interface defining the shape of the login data
interface LoginData {
  [key: string]: string | string[];
  email: string;
  password: string;
}

function Login() {
  // State hook to manage the login data and error messages
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginData>>({});

  // Input change event handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Update the loginData state based on the input name and value
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission event handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check for errors
    if (!loginData.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    if (!loginData.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter your password.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }

    // If no errors, proceed with form submission
    if (!errors.email && !errors.password) {
      console.log("Form submitted with data:", loginData);
    }
  };

  // JSX
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
            Student Attendance
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                placeholder="Enter your Email"
                type="text"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring
                 focus:border-blue-300 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                placeholder="Enter your Password"
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <Link to="/student-dashboard">
              <button
                type="submit"
                className="bg-orange-700 text-white p-3 rounded-md w-full hover:bg-orange-800 focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </button>
            </Link>

            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div
        className="md:flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home-right.jpg')" }}
      ></div>
    </div>
  );
}

export default Login;
