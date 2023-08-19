const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        facebookId: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        avatar: String,
        role: {
            type: String,
            required: true,
            default: "user",
            enum: ["user", "admin"]
        },
        token: {
            type: String,
            required: true,
        }
    },
    {
        versionKey: false
    }
);

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model("User", UserSchema);

module.exports = User;