const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./config");

const User = require("./app/models/User");
const Cocktail = require("./app/models/Cocktail");

mongoose.connect(config.db.url + "/" + config.db.name);
const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("users");
        await db.dropCollection("cocktails");

    } catch (e) {
        console.log("Collections were not present, skipping drop...");
    }

    const userUser = await User.create(
        {
            facebookId: config.facebook.appId,
            displayName: "user",
            avatar: "user.jpg",
            role: "user",
            token: nanoid()
        }
    );

    await Cocktail.create(
        {
            user: userUser._id,
            title: "Long Island Ice Tea",
            recipe: "Fill a cocktail shaker",
            image: "cocktail-1.png",
            published: "true",
            ingredients: JSON.stringify(
                [{
                    name: "White rum",
                    amount: "15 ml"
                }]
            ),
            ratings: JSON.stringify(
                [{
                    user: userUser._id,
                    rating: 1
                }]
            )
        },
        {
            user: userUser._id,
            title: "Another Long Island Ice Tea",
            recipe: "Here should be some recipe of this cocktail",
            image: "cocktail-2.JPG",
            published: "false",
            ingredients: JSON.stringify(
                [{
                    name: "Jin",
                    amount: "30 ml"
                }]
            ),
            ratings: JSON.stringify(
                [{
                    user: userUser._id,
                    rating: 2
                }]
            )
        }
    );

    db.close();
    console.log("Connect closed");
});
