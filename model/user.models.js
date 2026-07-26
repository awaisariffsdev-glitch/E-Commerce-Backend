const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    contact: { type: String },
    image: { type: String },
    password: { type: String, required: true }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
module.exports = User;