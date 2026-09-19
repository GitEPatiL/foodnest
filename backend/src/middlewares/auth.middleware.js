const foodPartnerModel = require("../models/foodpartener.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.foodPartnerToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invaid Token",
    });
  }
}


async function authUserMiddleware(req,res,next){

  const token = req.cookies.userToken;

  if(!token){
    return res.status(401).json({
      message:"Please Login first"
    })
  }

  try{
    const decoded = jwt.verify(userToken,process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    req.user = user;

    next()
  }catch(err){

    return res.status(401).json({
      message:`Invalid Toekn ${err}`
    })

  }

}

module.exports = { authFoodPartnerMiddleware,authUserMiddleware };


