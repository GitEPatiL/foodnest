//create server

const express = require("express");
const cokkieParser = require('cookie-parser');
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")

const app = express();

app.use(cookieParser())

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Pappa is back")
})

app.use('/api/auth',authRoutes)

module.exports = app;