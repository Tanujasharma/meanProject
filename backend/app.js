const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

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

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        res.status(201).json({
            message: "post added successfully on server",
            postId: result._id
        });
    });
});

app.get('/api/posts', (req, res, next) => {
   Post.find()
   .then(documents => {
        res.status(200).json({
            message: 'Post fetched successfully',
            posts: documents
        });
   });
});

app.delete("/api/posts/:id",(req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
    })
    res.status(200).json({
        message: 'Post Deleted!'
    })
});


module.exports = app;