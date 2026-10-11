const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartener.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ── Cookie configuration ────────────────────────────────────────────
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

// ── Validation helpers ──────────────────────────────────────────────
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateLoginFields(email, password) {
  const errors = [];
  if (!email || !email.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(email.trim())) {
    errors.push("Please provide a valid email address");
  }
  if (!password) {
    errors.push("Password is required");
  }
  return errors;
}

function validateUserRegistration({ fullName, email, password }) {
  const errors = validateLoginFields(email, password);
  if (!fullName || !fullName.trim()) {
    errors.push("Full name is required");
  }
  if (password && password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  return errors;
}

function validateFoodPartnerRegistration({
  name,
  email,
  password,
  foodPartnerName,
  address,
  phone,
}) {
  const errors = validateLoginFields(email, password);
  if (!name || !name.trim()) {
    errors.push("Owner name is required");
  }
  if (!foodPartnerName || !foodPartnerName.trim()) {
    errors.push("Restaurant name is required");
  }
  if (!address || !address.trim()) {
    errors.push("Address is required");
  }
  if (!phone || !phone.trim()) {
    errors.push("Phone number is required");
  }
  if (password && password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  return errors;
}

// ── User auth controllers ───────────────────────────────────────────

//register user
async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const errors = validateUserRegistration({ fullName, email, password });
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const isUserAlreadyExist = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.cookie("userToken", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
}

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validateLoginFields(email, password);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const user = await userModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("userToken", token, cookieOptions);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
};

//logout user
const logoutUser = (req, res) => {
  res.clearCookie("userToken", {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
  });

  res.status(200).json({
    message: "User logged out successfully",
  });
};

// ── Food Partner auth controllers ───────────────────────────────────

//register food partner profile
const registerFoodPartner = async (req, res) => {
  try {
    const { name, email, password, foodPartnerName, address, phone } = req.body;

    const errors = validateFoodPartnerRegistration({
      name,
      email,
      password,
      foodPartnerName,
      address,
      phone,
    });
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const isAccountAlreadyRegistered = await foodPartnerModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (isAccountAlreadyRegistered) {
      return res.status(400).json({
        message: "Food Partner account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      phone: phone.trim(),
      address: address.trim(),
      foodPartnerName: foodPartnerName.trim(),
    });

    const token = jwt.sign(
      {
        id: foodPartner._id,
        role: "foodPartner",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("foodPartnerToken", token, cookieOptions);

    res.status(201).json({
      message: "Food Partner registered successfully",
      foodPartner: {
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name,
        foodPartnerName: foodPartner.foodPartnerName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Food Partner registration failed. Please try again.",
    });
  }
};

const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validateLoginFields(email, password);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const foodPartner = await foodPartnerModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!foodPartner) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foodPartner.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: foodPartner._id,
        role: "foodPartner",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("foodPartnerToken", token, cookieOptions);

    res.status(200).json({
      message: "Food Partner logged in successfully",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        foodPartnerName: foodPartner.foodPartnerName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Food Partner login failed. Please try again.",
    });
  }
};

const logoutFoodPartner = (req, res) => {
  res.clearCookie("foodPartnerToken", {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
  });

  res.status(200).json({
    message: "Food Partner logged out successfully",
  });
};

// Get current authenticated food partner profile (me)
const getFoodPartnerProfile = async (req, res) => {
  try {
    if (!req.foodPartner) {
      return res.status(401).json({
        message: "Unauthorized - Food partner profile not found",
      });
    }

    res.status(200).json({
      foodPartner: {
        _id: req.foodPartner._id,
        name: req.foodPartner.name,
        foodPartnerName: req.foodPartner.foodPartnerName,
        email: req.foodPartner.email,
        phone: req.foodPartner.phone,
        address: req.foodPartner.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve food partner profile",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  getFoodPartnerProfile,
};
