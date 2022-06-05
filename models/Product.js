const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        img: { type: Array, required: true },
        price: { type: Number, required: true },
        productType: { type: String, required: true },
        categories: { type: Array },
        sizes: { type: Array },
        colors: { type: Array },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema)