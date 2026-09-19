const express = require("express");
const foodController = require("../controllers/food.controller");
const authmiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

// post  /api/food [protected]
router.post(
  "/",
  authmiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

// get  /api/food [protected]
router.get("/",authmiddleware.authFoodPartnerMiddleware,)

module.exports = router;
