const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    preparation: {
      type: String,
    },
    size_prices: {
      type: Array,
      required: true,
    },
    category: { type: String },
    sub_category: { type: Array },
    slug: {
      type: String,
      unique: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
