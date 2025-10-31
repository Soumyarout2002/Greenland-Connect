const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Land title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    address: {
      state: { type: String, required: [true, "State is required"] },
      city: { type: String, required: [true, "City is required"] },
      area: { type: String, required: [true, "Area is required"] },
      pincode: { type: String, required: [true, "Pincode is required"] },
    },
    imageUrls: {
      type: [String],
      required: [true, "At least one image is required"],
    },
  },
  { timestamps: true}
);

module.exports = mongoose.model("Land", landSchema);
