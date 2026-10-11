const mongoose = require("mongoose");
const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { ALLOWED_MIME_TYPES } = require("../middlewares/upload.middleware");
const { v4: uuid } = require("uuid");

// ── Validation Helpers ────────────────────────────────────────────────

function validateFoodInput({ name, description, price, category }) {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push("Food name is required");
  } else if (name.trim().length < 2) {
    errors.push("Food name must be at least 2 characters");
  }

  if (!description || !description.trim()) {
    errors.push("Food description is required");
  } else if (description.trim().length < 5) {
    errors.push("Food description must be at least 5 characters");
  }

  if (price === undefined || price === null || price === "") {
    errors.push("Price is required");
  } else {
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      errors.push("Price must be a positive number");
    }
  }

  if (!category || !category.trim()) {
    errors.push("Category is required");
  }

  return errors;
}

// ── Controllers ───────────────────────────────────────────────────────

/**
 * POST /api/food
 * Create a new food item with multipart/form-data image upload to ImageKit
 * (Authenticated food partner only)
 */
const createFood = async (req, res) => {
  try {
    const { name, description, price, category, isAvailable } = req.body;

    // 1. Validate textual inputs before any upload attempt
    const validationErrors = validateFoodInput({
      name,
      description,
      price,
      category,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: validationErrors[0],
        errors: validationErrors,
      });
    }

    // 2. Validate file existence
    if (!req.file) {
      return res.status(400).json({
        message: "Food image file is required under field 'image'",
      });
    }

    // 3. Validate image MIME type
    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype.toLowerCase())) {
      return res.status(400).json({
        message:
          "Invalid file type. Only JPEG, JPG, PNG, and WEBP image formats are supported.",
      });
    }

    // 4. Validate reasonable file size (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (req.file.size > MAX_SIZE) {
      return res.status(400).json({
        message: "Image file too large. Maximum allowed size is 5MB.",
      });
    }

    // 5. Convert and upload to ImageKit (Zero DB records created until upload succeeds)
    let uploadResult;
    try {
      const base64File = req.file.buffer.toString("base64");
      const safeOriginalName = req.file.originalname
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .toLowerCase();
      const uniqueFileName = `${uuid()}_${safeOriginalName}`;

      uploadResult = await storageService.uploadfile(
        base64File,
        uniqueFileName,
        "/foodnest/food-images"
      );
    } catch (uploadError) {
      // 9. Handle ImageKit failure cleanly without creating a broken database record
      return res.status(502).json({
        message:
          "Failed to upload food image to ImageKit. Food item was not created.",
        error: uploadError.message,
      });
    }

    if (!uploadResult || !uploadResult.url) {
      return res.status(502).json({
        message:
          "Image upload failed to produce a valid URL. Food item was not created.",
      });
    }

    // 6 & 7. Save returned URL and associate with req.foodPartner._id in MongoDB
    let foodItem;
    try {
      foodItem = await foodModel.create({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category: category.trim(),
        image: uploadResult.url,
        isAvailable:
          isAvailable !== undefined
            ? isAvailable === "true" || isAvailable === true
            : true,
        foodPartner: req.foodPartner._id,
      });
    } catch (dbError) {
      // Clean up orphaned uploaded file if DB record insertion fails
      if (uploadResult?.fileId) {
        await storageService.deleteFile(uploadResult.fileId);
      }
      throw dbError;
    }

    // 8. Return the populated created food document
    const populatedFood = await foodItem.populate(
      "foodPartner",
      "name foodPartnerName email phone address"
    );

    return res.status(201).json({
      message: "Food item created successfully",
      food: populatedFood,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create food item",
      error: error.message,
    });
  }
};

/**
 * GET /api/food
 * List all food items with optional query filters (Public)
 */
const getAllFood = async (req, res) => {
  try {
    const { category, foodPartner, isAvailable, search } = req.query;

    const filter = {};

    if (category && category.trim()) {
      filter.category = new RegExp(`^${category.trim()}$`, "i");
    }

    if (foodPartner && mongoose.Types.ObjectId.isValid(foodPartner)) {
      filter.foodPartner = foodPartner;
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true" || isAvailable === true;
    }

    if (search && search.trim()) {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
        { category: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const foodItems = await foodModel
      .find(filter)
      .populate("foodPartner", "name foodPartnerName email phone address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Food items retrieved successfully",
      count: foodItems.length,
      data: foodItems,
      foodItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve food items",
      error: error.message,
    });
  }
};

/**
 * GET /api/food/:id
 * Retrieve a single food item by ID (Public)
 */
const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid food item ID format",
      });
    }

    const foodItem = await foodModel
      .findById(id)
      .populate("foodPartner", "name foodPartnerName email phone address");

    if (!foodItem) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    return res.status(200).json({
      message: "Food item retrieved successfully",
      food: foodItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve food item",
      error: error.message,
    });
  }
};

/**
 * PUT /api/food/:id
 * Update a food item (Owner food partner only, supports multipart image update)
 */
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid food item ID format",
      });
    }

    const foodItem = await foodModel.findById(id);

    if (!foodItem) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    // Ownership check: must be owner food partner
    if (foodItem.foodPartner.toString() !== req.foodPartner._id.toString()) {
      return res.status(403).json({
        message: "Forbidden - You can only modify your own food items",
      });
    }

    const { name, description, price, category, isAvailable } = req.body;

    // Field validations if provided
    if (name !== undefined) {
      if (!name || !name.trim()) {
        return res.status(400).json({ message: "Food name cannot be empty" });
      }
      if (name.trim().length < 2) {
        return res
          .status(400)
          .json({ message: "Food name must be at least 2 characters" });
      }
      foodItem.name = name.trim();
    }

    if (description !== undefined) {
      if (!description || !description.trim()) {
        return res
          .status(400)
          .json({ message: "Food description cannot be empty" });
      }
      if (description.trim().length < 5) {
        return res
          .status(400)
          .json({ message: "Food description must be at least 5 characters" });
      }
      foodItem.description = description.trim();
    }

    if (price !== undefined) {
      const numPrice = Number(price);
      if (isNaN(numPrice) || numPrice <= 0) {
        return res
          .status(400)
          .json({ message: "Price must be a positive number" });
      }
      foodItem.price = numPrice;
    }

    if (category !== undefined) {
      if (!category || !category.trim()) {
        return res.status(400).json({ message: "Category cannot be empty" });
      }
      foodItem.category = category.trim();
    }

    if (isAvailable !== undefined) {
      foodItem.isAvailable =
        isAvailable === "true" || isAvailable === true;
    }

    // If new image file is uploaded, validate and upload to ImageKit
    if (req.file) {
      if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype.toLowerCase())) {
        return res.status(400).json({
          message:
            "Invalid file type. Only JPEG, JPG, PNG, and WEBP image formats are supported.",
        });
      }

      const base64File = req.file.buffer.toString("base64");
      const safeOriginalName = req.file.originalname
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .toLowerCase();
      const uniqueFileName = `${uuid()}_${safeOriginalName}`;

      const uploadResult = await storageService.uploadfile(
        base64File,
        uniqueFileName,
        "/foodnest/food-images"
      );

      foodItem.image = uploadResult.url;
    }

    await foodItem.save();

    const updatedFood = await foodModel
      .findById(id)
      .populate("foodPartner", "name foodPartnerName email phone address");

    return res.status(200).json({
      message: "Food item updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update food item",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/food/:id
 * Delete a food item (Owner food partner only)
 */
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid food item ID format",
      });
    }

    const foodItem = await foodModel.findById(id);

    if (!foodItem) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    // Ownership check: must be owner food partner
    if (foodItem.foodPartner.toString() !== req.foodPartner._id.toString()) {
      return res.status(403).json({
        message: "Forbidden - You can only delete your own food items",
      });
    }

    await foodModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Food item deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete food item",
      error: error.message,
    });
  }
};

module.exports = {
  createFood,
  getAllFood,
  getFood: getAllFood, // backward compatibility
  getFoodById,
  updateFood,
  deleteFood,
};
