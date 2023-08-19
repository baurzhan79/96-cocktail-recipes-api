const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const runMongoose = async () => {
    await mongoose.connect("mongodb://localhost/cocktail-recipes", { useNewUrlParser: true });
    console.log("mongoose connected");

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

runMongoose();