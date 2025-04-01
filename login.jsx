import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure this file exists

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Dynamic background image URL
  const backgroundImageUrl =
    "https://www.thehousedesigners.com/images/plans/01/MHD/bulk/2009/untitled-design_m.webp";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🔄 Attempting login with:", formData);
      const response = await axios.post("http://localhost:5000/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        console.log("✅ Login successful! Token:", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        setIsLoggedIn(true);
        setMessage("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/");
          console.log("🔄 Redirected to home.");
        }, 1500);
      } else {
        console.error("❌ Login failed: No token received.");
        setMessage("Login failed. No token received.");
      }
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setMessage(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>

        {/* Signup button */}
        <p className="signup-text">
          Don't have an account?{" "}
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>

        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}

export default Login;
