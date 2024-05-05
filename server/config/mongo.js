const mongoose = require("mongoose");

module.exports = {
    configureDB: () => {
        mongoose.connect("mongodb://localhost:27017/DataB")
        console.log(mongoose.connection.readyState);
    }
}