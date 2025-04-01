const express = require("express");
const multer = require("multer");
const path = require("path");
const authenticateUser = require("../middleware/authMiddleware");
const Property = require("../models/Property");

const router = express.Router();

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images inside "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Get all properties
router.get("/properties", authenticateUser, async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add a new property with image upload
router.post("/properties", authenticateUser, upload.single("image"), async (req, res) => {
  try {
    const { title, address, city, zip, price, latitude, longitude, contact, isOccupied } = req.body;

    // Check if an image was uploaded
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProperty = new Property({
      title,
      address,
      city,
      zip,
      price,
      imageUrl, // Store image URL
      latitude,
      longitude,
      contact,
      isOccupied,
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Error creating property", error });
  }
});

// ✅ Update an existing property
router.put("/properties/:id", authenticateUser, upload.single("image"), async (req, res) => {
  try {
    const { contact, isOccupied } = req.body;

    // Check if an image was uploaded
    const updateData = {
      contact,
      isOccupied,
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Error updating property" });
  }
});

module.exports = router;
