require('dotenv').config()
const mongoose = require('mongoose');

const ConnectDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Connected to Database")
        })
        .catch((err) => {
            console.error("Not Connected to database", err)
        })
}


module.exports = {ConnectDB};
