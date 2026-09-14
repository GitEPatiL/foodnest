const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist){;
  return res.status(400).json({
    message: "User already exists",
  });
}


const hashedPassword = await bcrypt.hash(password,10);

const user = await userModel.create({
    fullName,
    email,
    password:hashedPassword
})

const token = jwt.sign({
    id:user._id,
},"dbe686a76a8fbcfc738f823614c6a03554f9ac29")
res.cookie("token",token);

res.status(201).json({
    message:"User registered Successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName: user.fullName
    }

})

}


const loginUser = async (req,res)=>{
    const {email,password}= req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        res.status(400).json({
            message:"Invalid email or password"
        })
    }

}


module.exports={registerUser,loginUser}
