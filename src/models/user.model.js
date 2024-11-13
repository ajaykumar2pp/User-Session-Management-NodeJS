const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    date: { type: String },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });




module.exports = mongoose.model('User', userSchema);