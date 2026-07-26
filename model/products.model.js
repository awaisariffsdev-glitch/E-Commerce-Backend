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
        type: String,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },



})