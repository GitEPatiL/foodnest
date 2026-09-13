const mongoose = require("mongoose");


function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-view")
    .then(()=>{
        console.log("MongoDB Connected")
    }).catch((err)=>{
        console.log("MongoDB connection error ",err)
    })
}

module.exports = connectDB;