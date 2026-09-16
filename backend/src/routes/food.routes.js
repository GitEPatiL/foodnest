const express = require("express");
const foodController = require("../controllers/food.controller")
const authmiddleware = require("../middlewares/auth.middleware")

const router = express.Router();

// post  /api/food [protected]
router.post("/",authmiddleware.authFoodPartnerMiddleware,foodController.createFood)

module.exports = router;
