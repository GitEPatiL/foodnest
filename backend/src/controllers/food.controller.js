const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  //   console.log(req.foodPartner);

  //   console.log(req.body);
  //   console.log(req.file);

  const base64File = req.file.buffer.toString("base64");
  const fileUploadResult = await storageService.uploadfile(base64File, uuid());

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "food created successfully",
    food: foodItem,
  });
};

const getFood = async (req, res) => {
  try {
    const data = await foodModel.find();

    res.status(200).json({
      data,
    });
    console.log(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createFood,
  getFood,
};
