const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CocktailSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: String,
        recipe: String,
        published: {
            type: Boolean,
            required: true
        },
        ingredients: {
            type: Array
        },
        ratings: {
            type: Array
        }
    },
    {
        versionKey: false
    }
);

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
module.exports = Cocktail;