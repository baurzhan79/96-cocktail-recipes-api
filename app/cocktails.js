const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const Cocktail = require("./models/Cocktail");

const auth = require("./middleware/auth");

const multer = require("multer");
const path = require("path");
const config = require("../config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const createRouterMongoose = () => {
    router.get("/", async (req, res) => {
        let filter = {};
        if (req.query.user) {
            filter.user = req.query.user;
        }

        try {
            const cocktails = await Cocktail.find(filter).populate("user");
            res.send(cocktails);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const cocktails = await Cocktail.findById(req.params.id);
            res.send(cocktails);
        }
        catch (err) {
            res.status(404).send(err);
        }
    });

    router.post("/", [auth, upload.single("image")], async (req, res) => {
        const cocktailData = req.body;

        if (req.file) {
            cocktailData.image = req.file.filename;
        }
        else {
            cocktailData.image = null;
        }

        const cocktail = new Cocktail(cocktailData);

        try {
            const result = await cocktail.save();
            res.send(result);
        }
        catch (err) {
            res.status(400).send(err);
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            await Cocktail.deleteOne({ _id: req.params.id });
            res.send({ "message": "cocktail deleted" });
        }
        catch (err) {
            res.send(err);
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            await Cocktail.updateOne({ _id: req.params.id }, { published: true });
            res.send({ "message": "cocktail published" });
        }
        catch (err) {
            res.send(err);
        }
    });

    return router;
}

module.exports = createRouterMongoose;