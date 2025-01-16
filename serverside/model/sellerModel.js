import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contactNumber: {
        type: String,
        match: /^[0-9]{4}[0-9]{7}$/,  // Regex Pattern to validate the number
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    shops: [
        {
            shopId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'shop'
            },
            shopName: {
                type: String,
            }
        }
    ],
    shopAccessAllowed: {
        type: Boolean,
        default: false
    }
})

const Seller = mongoose.model("seller", sellerSchema);
export default Seller