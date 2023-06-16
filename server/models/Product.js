const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: Array,
      required: true
    },
    franchise: {
      type: String, 
      required: true
    },
    brand: {
      type: String, 
      required: true
    },
    description: {
      type: String
    },
    releaseDate: {
      type: String
    },
  },
  { timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);