const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    browserId: String,
    browser: String,
    os: String,
    deviceInfo: String,
    lastActiveOn: String
}, { timestamps: true });




module.exports = mongoose.model('UserInfo', userSchema);