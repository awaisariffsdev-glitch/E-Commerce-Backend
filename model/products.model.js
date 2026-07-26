const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    discountPrice: {
        type: Number
    },
    image: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },



})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;