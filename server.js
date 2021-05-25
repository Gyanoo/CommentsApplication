const express = require("express");
const mongoose = require("mongoose");
const Comment = require("./databaseScheme");

const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost/comments", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Add headers
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    next();
});

app.use(express.json());

app.get("/allComments", async (req, res) => {
    const comments = await Comment.find().sort({ date: "desc" });
    res.send(JSON.stringify(comments));
});

app.post("/addNewComment", (req, res) => {
    let addedComment = new Comment({
        title: req.body.title,
        comment: req.body.comment,
        date: new Date(),
    });
    try {
        addedComment.save();
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
