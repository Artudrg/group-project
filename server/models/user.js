const mongoose = require("mongoose");
const {Schema} = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "The user needs a first name"],
        minlength: [10, "El nombre no puede tener menos de 10 caracteres"]
    },
    email: {
        type: String,
        required: [true, "The user needs a email"]
    },
    password: {
        type: String,
        required: [true, "The user needs a password"]
    }
})

const User =  mongoose.model("Users", UserSchema);

module.exports = {
    User
    //Student: Student
}