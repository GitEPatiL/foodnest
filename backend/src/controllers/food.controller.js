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

module.exports = {
  createFood,
};
