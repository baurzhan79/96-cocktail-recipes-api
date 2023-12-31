const express = require("express");
const axios = require("axios");
const imageDownloader = require("image-downloader");

const User = require("./models/User");
const auth = require("./middleware/auth");

const path = require("path");
const config = require("../config");

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

    router.post("/facebookLogin", async (req, res) => {
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
                    displayName: req.body.name,
                    role: "admin"
                });
            }

            user.generateToken();
            await user.save({ validateBeforeSave: false });

            if (req.body.avatar) {
                imageDownloaderOptions = {
                    url: req.body.avatar,
                    dest: config.uploadPath + "/" + req.body.email + ".jpg"
                };

                try {
                    const result = await imageDownloader.image(imageDownloaderOptions);
                    user.avatar = path.basename(result.filename);
                    await user.save({ validateBeforeSave: false });
                }
                catch (err) {
                    console.error(err)
                }
            }

            return res.send({ message: "Facebook login successful", user });
        }
        catch (error) {
            return res.status(401).send({ message: "Facebook token incorrect" });
        }
    });

    router.delete("/sessions", auth, async (req, res) => {
        const success = { message: "Success" };
        const user = req.user;
        user.token = "";
        user.save({ validateBeforeSave: false });
        return res.send(success);
    });

    return router;
}

module.exports = createRouterMongoose;
