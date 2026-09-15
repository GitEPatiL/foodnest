const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartener.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//regiter user
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: "user",
    },
    process.env.JWT_SECRET,
  );
  res.cookie("userToken", token);

  res.status(201).json({
    message: "User registered Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
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
  );

  res.cookie("userToken", token);

  res.status(200).json({
    message: "User Logged in Successfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

//logout api

const logoutUser = (req, res) => {
  res.clearCookie("userToken");

  res.status(200).json({
    message: "User logged out successfully",
  });
};

//register food partener profile
const registerFoodPartner = async (req, res) => {
  const { name, email, password } = req.body;

  const isAccountAlreadyRegistered = await foodPartnerModel.findOne({
    email,
  });

  if (isAccountAlreadyRegistered) {
    return res.status(400).json({
      message: "Food Partner acoout already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
      role: "foodPartner",
    },
    process.env.JWT_SECRET,
  );

  res.cookie("foodPartnerToken", token);

  res.status(201).json({
    message: "Food Partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
};

const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email and passsord",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email and password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
      role: "foodPartner",
    },
    process.env.JWT_SECRET,
  );

  res.cookie("foodPartnerToken", token);

  res.status(201).json({
    message: "Food partener logged in successfuly",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
    },
  });
};

const logoutFoodPartner = async (req, res) => {
  res.clearCookie("foodPartnerToken");

  res.status(200).json({
    message: "food partner is logged out succesfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
