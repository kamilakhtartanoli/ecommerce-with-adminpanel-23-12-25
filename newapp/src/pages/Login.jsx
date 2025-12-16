import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/adminlogin", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      toast.success("Login successful!");

      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-3">
      <div
        className="bg-white shadow-lg p-6 sm:p-8 rounded-xl w-full max-w-sm border-t-4"
        style={{ borderColor: "#0505B9" }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-5"
          style={{ color: "#0505B9" }}
        >
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 text-white rounded-lg hover:opacity-90 transition font-semibold"
            style={{ background: "#0505B9" }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm sm:text-base">
          Don't have an account?{" "}
          <Link
            to={"/admin/signup"}
            className="font-bold"
            style={{ color: "#0505B9" }}
          >
            Sign Up
          </Link>
        </p>
        <div className="text-center">
          <Link to={"/"}>
            <p className="inline-block pt-3 font-semibold text-red-700 transition ease-in hover:text-red-600">
              Go to home page
            </p>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
