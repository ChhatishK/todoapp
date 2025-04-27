const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async() => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database Connected!"))
    .catch((error) => {
        console.log("Database Connection Failed!");
        console.log(error);
        process.exit(1);
    })
}
