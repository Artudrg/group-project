const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "The user needs a first name"],
        minlength: [2, "El nombre no puede tener menos de 2 caracteres"]
    },
    email: {
        type: String,
        required: [true, "The user needs an email"]
    },
    password: {
        type: String,
        required: [true, "The user needs a password"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const User = mongoose.model("Users", UserSchema);

module.exports = {
    User
};
