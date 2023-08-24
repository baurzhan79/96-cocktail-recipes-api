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
            title: "Margarita",
            recipe: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
            image: "Margarita.jpg",
            published: "true",
            ingredients: JSON.stringify(
                [
                    {
                        name: "Tequila",
                        amount: "1 1/2 oz"
                    },
                    {
                        name: "Triple sec",
                        amount: "1/2 oz"
                    },
                    {
                        name: "Lime juice",
                        amount: "1 oz"
                    },
                    {
                        name: "Salt",
                        amount: ""
                    }
                ]
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
            title: "Blue Margarita",
            recipe: "Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.",
            image: "Blue Margarita.jpg",
            published: "false",
            ingredients: JSON.stringify(
                [
                    {
                        name: "Tequila",
                        amount: "1 1/2 oz"
                    },
                    {
                        name: "Blue Curacao",
                        amount: "1 oz"
                    },
                    {
                        name: "Lime juice",
                        amount: "1 oz"
                    },
                    {
                        name: "Salt",
                        amount: "Coarse"
                    }
                ]
            ),
            ratings: JSON.stringify(
                [{
                    user: userUser._id,
                    rating: 2
                }]
            )
        },
        {
            user: userUser._id,
            title: "Tommy's Margarita",
            recipe: "Shake and strain into a chilled cocktail glass.",
            image: "Tommy's Margarita.jpg",
            published: "false",
            ingredients: JSON.stringify(
                [
                    {
                        name: "Tequila",
                        amount: "4.5 cl"
                    },
                    {
                        name: "Lime juice",
                        amount: "1.5 cl"
                    },
                    {
                        name: "Agave syrup",
                        amount: "2 spoons"
                    }
                ]
            ),
            ratings: JSON.stringify(
                [{
                    user: userUser._id,
                    rating: 3
                }]
            )
        },
        {
            user: userUser._id,
            title: "Whitecap Margarita",
            recipe: "Place all ingredients in a blender and blend until smooth. This makes one drink.",
            image: "Whitecap Margarita.jpg",
            published: "true",
            ingredients: JSON.stringify(
                [
                    {
                        name: "Ice",
                        amount: "1 cup"
                    },
                    {
                        name: "Tequila",
                        amount: "2 oz"
                    },
                    {
                        name: "Cream of coconut",
                        amount: "1/4 cup"
                    },
                    {
                        name: "Lime juice",
                        amount: "3 tblsp fresh"
                    }
                ]
            ),
            ratings: JSON.stringify(
                [{
                    user: userUser._id,
                    rating: 4
                }]
            )
        },
        {
            user: userUser._id,
            title: "Strawberry Margarita",
            recipe: "Rub rim of cocktail glass with lemon juice and dip rim in salt. Shake schnapps, tequila, triple sec, lemon juice, and strawberries with ice, strain into the salt-rimmed glass, and serve.",
            image: "Strawberry Margarita.jpg",
            published: "false",
            ingredients: JSON.stringify(
                [
                    {
                        name: "Strawberry schnapps",
                        amount: "1/2 oz"
                    },
                    {
                        name: "Tequila",
                        amount: "1 oz"
                    },
                    {
                        name: "Triple sec",
                        amount: "1/2 oz"
                    },
                    {
                        name: "Lemon juice",
                        amount: "1 oz"
                    },
                    {
                        name: "Strawberries",
                        amount: "1 oz"
                    },
                    {
                        name: "Salt",
                        amount: ""
                    }
                ]
            ),
            ratings: JSON.stringify(
                [{
                    user: userUser._id,
                    rating: 5
                }]
            )
        }
    );

    db.close();
    console.log("Connect closed");
});
