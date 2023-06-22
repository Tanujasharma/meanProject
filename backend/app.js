const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");


const app = express();

mongoose.connect("mongodb+srv://tanujasharma584:iHlFOuhMpneyse2o@cluster0.duc3it9.mongodb.net/node-angular?retryWrites=true&w=majority").then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-Headers',
    "Origin, X_Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, DELETE, OPTIONS, PUT")
    next();
})

app.use("/api/posts", postRoutes);

module.exports = app;