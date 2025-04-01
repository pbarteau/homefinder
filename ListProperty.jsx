import React, { useState } from "react";
import axios from "axios";
import "../styles/ListProperty.css"; // Ensure CSS is properly linked

const ListProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    phone: "",
    email: "",
    status: "available", // Default status
    imageUrl: "https://images.trvl-media.com/hotels/37000000/36890000/36888300/36888291/b1c6ef59_z.jpg", // Default image URL
    latitude: "", // Add latitude
    longitude: "", // Add longitude
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Store error messages

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission with validation and logging
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    // Log formData for debugging
    console.log("Form Data before submission:", formData);

    // Validate that all fields are filled
    for (let key in formData) {
      if (formData[key] === "" || formData[key] === undefined) {
        setError(`❌ Please fill in all the fields. Missing: ${key}`);
        setLoading(false);
        return;
      }
    }

    // Validate latitude and longitude
    if (isNaN(formData.latitude) || isNaN(formData.longitude)) {
      setError("❌ Latitude and Longitude must be valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Ensure authentication

      if (!token) {
        setError("❌ Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }

      console.log("Sending the following data:", formData); // Log the data being sent

      const response = await axios.post("http://localhost:5000/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const newProperty = response.data; // Assume backend sends back saved property

      // Store in localStorage for immediate display
      const properties = JSON.parse(localStorage.getItem("properties")) || [];
      properties.push(newProperty);
      localStorage.setItem("properties", JSON.stringify(properties));

      alert("✅ Property Listed Successfully!");

      // Reset form after successful submission
      setFormData({
        title: "",
        address: "",
        price: "",
        phone: "",
        email: "",
        status: "available",
        imageUrl: "https://images.trvl-media.com/hotels/37000000/36890000/36888300/36888291/b1c6ef59_z.jpg", // Reset to default
        latitude: "",
        longitude: "", // Reset latitude and longitude
      });
    } catch (error) {
      // Enhanced error handling and logging
      if (error.response) {
        console.error("❌ Error from server:", error.response.data);
        setError(error.response?.data?.error || "Failed to list property. Please try again.");
      } else if (error.request) {
        console.error("❌ No response received:", error.request);
        setError("❌ No response received from the server. Please try again.");
      } else {
        console.error("❌ Error during setup:", error.message);
        setError("❌ An error occurred while setting up the request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-property-container">
      <h1>List Your Property</h1>
      {error && <p className="error-message">❌ {error}</p>} {/* Display errors */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Status Dropdown */}
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>

        {/* Image URL Input */}
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />

        {/* Latitude and Longitude */}
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
        />

        {/* Image Preview */}
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="Property Preview" className="image-preview" />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Listing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ListProperty;
