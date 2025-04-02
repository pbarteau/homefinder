import { useState } from "react";

const ListProperty = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: "https://via.placeholder.com/150", // Default online image
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProperties([...properties, formData]);
    setFormData({ title: "", location: "", price: "", image: "https://via.placeholder.com/150" });
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Property
        </button>
      </form>
      
      <h2 className="text-xl font-bold mt-6">Listed Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {properties.map((property, index) => (
          <div key={index} className="border p-4 rounded">
            <img src={property.image} alt={property.title} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p>{property.location}</p>
            <p className="text-green-600 font-bold">${property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProperty;
