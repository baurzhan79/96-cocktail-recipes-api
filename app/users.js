const express = require("express");
const axios = require("axios");
const { nanoid } = require("nanoid");

const User = require("./models/User");

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

const router = express.Router();

const createRouterMongoose = () => {
    router.get("/", async (req, res) => {
        try {
            const users = await User.find();
            res.send(users);
        }
        catch (e) {
            res.sendStatus(500);
        }
    });

    router.post("/facebookLogin", upload.single("image"), async (req, res) => {
        const inputToken = req.body.accessToken;
        const accessToken = config.facebook.appId + "|" + config.facebook.appSecret;
        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        try {
            const response = await axios.get(debugTokenUrl);

            if (response.data.data.error) {
                return res.status(401).send({ message: "Facebook token incorrect" });
            }

            if (req.body.id !== response.data.data.user_id) {
                return res.status(401).send({ message: "Wrong user ID" });
            }

            let user = await User.findOne({ facebookId: req.body.id });

            if (!user) {
                user = new User({
                    facebookId: req.body.id,
                    displayName: req.body.name
                });
                if (req.file) user.avatar = req.file.filename;
                else user.avatar = null;
            }

            user.generateToken();
            await user.save({ validateBeforeSave: false });

            return res.send({ message: "Facebook login successful", user });
        }
        catch (error) {
            return res.status(401).send({ message: "Facebook token incorrect" });
        }
    });

    return router;
}

module.exports = createRouterMongoose;
