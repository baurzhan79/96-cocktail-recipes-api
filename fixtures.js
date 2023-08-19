const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./config");

const User = require("./app/models/User");

mongoose.connect(config.db.url + "/" + config.db.name);
const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("users");
    } catch (e) {
        console.log("Collections were not present, skipping drop...");
    }

    await User.create(
        {
            facebookId: config.facebook.appId,
            displayName: "admin",
            avatar: "admin.jpeg",
            role: "admin",
            token: nanoid()
        }
    );

    db.close();
    console.log("Connect closed");
});
