const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        categories: { type: Array },
        img: { type: String, required: true },
        price: { type: Number, required: true },
        productType: { type: String, required: true },
        size: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema)