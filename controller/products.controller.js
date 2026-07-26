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
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    productAdd
}