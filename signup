import { useState } from "react";
import axios from "axios";
import "../styles/Signup.css"; // Ensure this file exists

function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", formData);
      const response = await axios.post("http://localhost:5000/signup", formData, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed. Try again.");
      console.error("Signup Error:", err.response?.data);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url("https://www.thehousedesigners.com/images/plans/01/MHD/bulk/2009/untitled-design_m.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="auth-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
