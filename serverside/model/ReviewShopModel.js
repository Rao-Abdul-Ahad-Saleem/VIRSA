
import mongoose from mongoose;
import Customer from "./customerModel.js";

const shopReview = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const ShopReview = mongoose.model("ShopReview", shopReview);
export default ShopReview