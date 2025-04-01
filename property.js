const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true, enum: ["available", "occupied"] },
  image: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
