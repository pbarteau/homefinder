import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

    // Save the new property list to state and localStorage
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">List a Property</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price in USD"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </select>
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Property
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Listed Properties</h2>
      {properties.length > 0 ? (
        <div className="property-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {properties.map((property, index) => (
            <div key={index} className="property-card border p-4 rounded shadow">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> ${property.price}</p>
              <p><strong>Phone:</strong> {property.phone}</p>
              <p><strong>Email:</strong> {property.email}</p>
              <p><strong>Status:</strong> {property.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties listed yet.</p>
      )}

      <div className="map-container mt-6">
        <MapContainer
          center={[-1.286389, 36.817223]}
          zoom={10}
          style={{ width: "100%", height: "400px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {properties
            .filter((property) => property.latitude && property.longitude)
            .map((property, index) => (
              <Marker key={index} position={[property.latitude, property.longitude]}>
                <Popup>
                  <b>{property.title}</b> <br />
                  {property.address}, {property.location}
                  <br />
                  <img
                    src={property.image}
                    alt={property.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ListProperty;
