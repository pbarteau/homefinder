const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

// ✅ Create a new property using an online image URL
router.post("/", async (req, res) => {
  try {
    console.log("📩 Incoming Data:", req.body); // ✅ Log the incoming request body for debugging

    const { title, address, price, phone, email, status, imageUrl, latitude, longitude } = req.body;

    // ✅ Validate incoming data
    if (!title || !address || !price || !phone || !email || !imageUrl || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" }); // ✅ More specific error handling
    }

    // You can add more validation for latitude and longitude if needed (e.g., check if they are valid coordinates)
    const newProperty = new Property({
      title,
      address,
      price,
      phone,
      email,
      status,
      image: imageUrl, // ✅ Store image URL directly
      latitude,         // ✅ Store latitude
      longitude,        // ✅ Store longitude
    });

    await newProperty.save();
    res.status(201).json(newProperty); // ✅ Send back the newly created property
  } catch (error) {
    console.error("❌ Error saving property:", error.message); // ✅ More detailed error message
    res.status(500).json({ error: "Failed to save property", details: error.message });
  }
});

// ✅ Get all properties (supports filtering by status)
router.get("/", async (req, res) => {
  try {
    const { status } = req.query; // Filter properties based on status (available/occupied)
    const query = status ? { status } : {};
    const properties = await Property.find(query, "title address price phone email status image latitude longitude");

    res.json(properties); // ✅ Return list of properties
  } catch (error) {
    console.error("❌ Error fetching properties:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ Get a single property by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id, "title address price phone email status image latitude longitude");

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property); // ✅ Return the property details
  } catch (error) {
    console.error("❌ Error fetching property:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ Update a property by ID (supports image URL update)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, address, price, phone, email, status, imageUrl, latitude, longitude } = req.body;

  try {
    // Validate incoming data
    if (!title || !address || !price || !phone || !email || !imageUrl || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { title, address, price, phone, email, status, image: imageUrl, latitude, longitude },
      { new: true } // Return updated property
    );

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(updatedProperty); // ✅ Return the updated property
  } catch (error) {
    console.error("❌ Error updating property:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ Delete a property by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" }); // ✅ Confirmation message
  } catch (error) {
    console.error("❌ Error deleting property:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
