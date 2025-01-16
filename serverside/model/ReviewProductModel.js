import mongoose from "mongoose";
import Customer from "./customerModel.js";

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: Product, required: true }, // Links to the product
    userId: { type: mongoose.Schema.Types.ObjectId, ref: Customer, required: true }, // Links to the user
    rating: { type: Number, required: true, min: 0, max: 5 }, // Rating given by the user
    comment: { type: String }, // User's review comment
    date: { type: Date, default: Date.now }, // When the review was submitted
});

const ProductReview = mongoose.model("ProductReview", reviewSchema);
export default ProductReview