import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please provide an image URL.");
      return;
    }
    setProperties([...properties, formData]);
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
        <input type="text" name="title" placeholder="Property Title" value={formData.title} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="price" placeholder="Price in USD" value={formData.price} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 w-full" required />
        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 w-full">
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </select>
        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} className="border p-2 w-full" required />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Property</button>
      </form>

      <h2 className="text-xl font-bold mt-6">Listed Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {properties.map((property, index) => (
          <div key={index} className="border p-4 rounded">
            <img src={property.image} alt={property.title} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Phone:</strong> {property.phone}</p>
            <p><strong>Email:</strong> {property.email}</p>
            <p><strong>Status:</strong> {property.status}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-6">Property Locations</h2>
      <MapContainer center={[0.0236, 37.9062]} zoom={6} className="h-96 w-full mt-4">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map((property, index) => (
          <Marker key={index} position={[parseFloat(property.latitude), parseFloat(property.longitude)]}>
            <Popup>
              <h3>{property.title}</h3>
              <p>{property.address}</p>
              <p>Price: ${property.price}</p>
              <p>Status: {property.status}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ListProperty;
