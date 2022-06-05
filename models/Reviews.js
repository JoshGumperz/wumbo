const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        rating: { type: Number, required: true },
        userId: { type: String, required: true },
        productId:{ type:String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema)