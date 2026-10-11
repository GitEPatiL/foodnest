const foodPartnerModel = require("../models/foodpartener.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.foodPartnerToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - Please login as a food partner",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "foodPartner") {
      return res.status(403).json({
        message: "Forbidden - Food partner access required",
      });
    }

    const foodPartner = await foodPartnerModel
      .findById(decoded.id)
      .select("-password");

    if (!foodPartner) {
      return res.status(401).json({
        message: "Unauthorized - Food partner account not found",
      });
    }

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token",
    });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.userToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({
        message: "Forbidden - User access required",
      });
    }

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User account not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token",
    });
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
