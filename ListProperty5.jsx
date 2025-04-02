import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/ListProperty.css"; // Link to your CSS file

const ListProperty = () => {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    phone: "",
    email: "",
    address: "",
    status: "Available",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    // Load properties from localStorage on component mount
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(storedProperties);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please provide an image URL.");
      return;
    }

    const updatedProperties = [...properties, formData];

    // Save to state and localStorage
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));

    setFormData({
      title: "",
      location: "",
      price: "",
      image: "",
      phone: "",
      email: "",
      address: "",
      status: "Available",
      latitude: "",
      longitude: "",
    });
  };

  return (
    <div className="list-property-container">
      <h2>List a Property</h2>

      <form onSubmit={handleSubmit} className="list-property-form">
        <input type="text" name="title" placeholder="Property Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price in USD" value={formData.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </select>

        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />

        <button type="submit">Submit Property</button>
      </form>

      <h2>Listed Properties</h2>
      {properties.length > 0 ? (
        <div className="property-list">
          {properties.map((property, index) => (
            <div key={index} className="property-card">
              <img src={property.image} alt={property.title} />
              <h3>{property.title}</h3>
              <p><strong>Location:</strong> {property.location}</p>
              <p className="property-price"><strong>Price:</strong> ${property.price}</p>
              <p><strong>Phone:</strong> {property.phone}</p>
              <p><strong>Email:</strong> {property.email}</p>
              <p><strong>Status:</strong> {property.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties listed yet.</p>
      )}

      <div className="map-container">
        <MapContainer center={[-1.286389, 36.817223]} zoom={10} style={{ width: "100%", height: "400px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          {properties
            .filter((property) => property.latitude && property.longitude)
            .map((property, index) => (
              <Marker key={index} position={[property.latitude, property.longitude]}>
                <Popup>
                  <b>{property.title}</b> <br />
                  {property.address}, {property.location}
                  <br />
                  <img src={property.image} alt={property.title} style={{ width: "100px", height: "auto" }} />
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ListProperty;
