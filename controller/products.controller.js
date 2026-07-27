const mongoose = require("mongoose");
const Product = require("../model/products.model");
const productAdd = async (req, res) => {
    try {
        const { title, description, brand, model, discountPrice, price } = req.body;
        if (!title || !brand || !price || !description) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newProduct = new Product({
            title,
            description,
            brand,
            model,
            discountPrice,
            image: req.file ? req.file.path : null,
            price
        })

        await newProduct.save();

        return res.status(201).json({
            message: "Product Added Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


const productUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, brand, model, discountPrice, price } = req.body;
        const productUpdate = await Product.findByIdAndUpdate(id, { title, description, brand, model, discountPrice, image: req.file ? req.file.path : null, price }, { new: true });
        res.status(200).json({ message: "Product updated successfully", product: productUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const productDelete = async (req, res) => {
    try {
        const id  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    productAdd,
    productUpdate,
    productDelete
}