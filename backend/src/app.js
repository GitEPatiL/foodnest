//create server

const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("Pappa is back")
})

module.exports = app;