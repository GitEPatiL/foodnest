const express = require("express");
const foodController = require("../controllers/food.controller");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const router = express.Router();

// ── Public Routes ─────────────────────────────────────────────────────

// GET /api/food - List all food items
router.get("/", foodController.getAllFood);

// GET /api/food/:id - Get single food item by ID
router.get("/:id", foodController.getFoodById);

// ── Protected Routes (Food Partner Only) ──────────────────────────────

// POST /api/food - Create a new food item
router.post(
  "/",
  authFoodPartnerMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  foodController.createFood
);

// PUT /api/food/:id - Update an existing food item (Owner only)
router.put(
  "/:id",
  authFoodPartnerMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  foodController.updateFood
);

// DELETE /api/food/:id - Delete a food item (Owner only)
router.delete(
  "/:id",
  authFoodPartnerMiddleware,
  foodController.deleteFood
);

module.exports = router;
