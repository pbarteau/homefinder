/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Home.css"; // Ensure you have this CSS file
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to view properties.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/properties", {
        headers: { Authorization: token },
      });

      console.log("Properties fetched:", res.data);
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [navigate]);

  useEffect(() => {
    const newProperty = JSON.parse(localStorage.getItem("newProperty"));
    if (newProperty) {
      setProperties((prev) => [newProperty, ...prev]);
      localStorage.removeItem("newProperty");
    }
  }, []);

  const filteredProperties = properties.filter((property) => {
    const title = property.title?.toLowerCase() || "";
    const address = property.address?.toLowerCase() || "";
    return (
      title.includes(searchQuery.toLowerCase()) ||
      address.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="home-container">
      <h1>Find Your New Home!</h1>

      <button
        className="list-property-btn"
        onClick={() => navigate("/list-property")}
      >
        List Your Property
      </button>

      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        placeholder="Search by title or address..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="property-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property._id || Math.random()} className="property-card">
              <img
                src={property.imageUrl || "/default-house.jpg"}
                alt={property.title || "Property"}
                className="property-image"
              />
              <div className="property-info">
                <h3>{property.title || "No Title Available"}</h3>
                <p>
                  {property.address || "Unknown Address"},{" "}
                  {property.city || "Unknown City"}, {property.zip || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> $
                  {property.price?.toLocaleString() || "Not listed"}
                </p>
                <p>
                  <strong>Email:</strong> {property.email || "Not Available"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={property.isOccupied ? "occupied" : "available"}>
                    {property.isOccupied ? "Occupied" : "Available"}
                  </span>
                </p>
                {/* ✅ Display the phone number properly */}
                <p>
                  <strong>Phone:</strong>{" "}
                  {property.phone && property.phone.trim() !== ""
                    ? property.phone
                    : ""
                    
                    
                    
                    
      }
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>

      <MapContainer
        center={[-1.286389, 36.817223]}
        zoom={10}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredProperties
          .filter((property) => property.latitude && property.longitude)
          .map((property) => (
            <Marker
              key={property._id || Math.random()}
              position={[property.latitude, property.longitude]}
            >
              <Popup>
                <b>{property.title || "No Title"}</b> <br />
                {property.address || "No Address"}, {property.city || "No City"} <br />
                <img
                  src={property.imageUrl || "/default-house.jpg"}
                  alt={property.title || "Property"}
                  style={{ width: "100px", height: "auto" }}
                />
                <p><strong>Phone:</strong> {property.phone || "Not Available"}</p>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Home;
