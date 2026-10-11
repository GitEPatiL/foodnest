const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
      minlength: [2, "Food name must be at least 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
      trim: true,
      minlength: [5, "Food description must be at least 5 characters"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
      min: [0.01, "Price must be a positive number"],
    },
    category: {
      type: String,
      required: [true, "Food category is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Food image is required"],
      trim: true,
    },
    // Optional video field preserved for backward compatibility
    video: {
      type: String,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodpartner",
      required: [true, "Food partner reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;