import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  // State to hold email input value
  const [email, setEmail] = useState("");
  // State to hold password input value
  const [password, setPassword] = useState("");
  // Hook for programmatic navigation after login
  const navigate = useNavigate();

  // Handles form submission and sends login request to the server
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to login API
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify({ email, password }), // Send email and password in request body
      });

      // Parse JSON response
      const data = await response.json();

      if (response.ok) {
        // Save JWT token in localStorage
        localStorage.setItem("token", data.token);
        // Save email in localStorage for reference
        localStorage.setItem("email", email);

        // Show success alert and log response
        alert("Login successful");
        console.log("Response:", data);

        // Redirect to homepage after short delay
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      // Handle errors if request fails
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    // Full-screen container with gradient background
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Login card with shadow and rounded corners */}
      <div className="bg-white shadow-2xl rounded-xl p-8 lg:w-96 w-70">
        {/* Page title */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        {/* Subtitle under the title */}
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        {/* Login form */}
        <form onSubmit={handleSignUp}>
          {/* Email input field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Password input field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Submit button for sign-in */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Divider with "OR" text */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Link to sign-up page for new users */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
