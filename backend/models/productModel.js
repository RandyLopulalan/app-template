const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      unique: true,
    },
    stock: {
      type: Number,
      required: [true, "Please add a stock"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    image_url: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema)