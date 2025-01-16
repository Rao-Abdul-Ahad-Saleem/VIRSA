import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({

    businessName: { type: String, required: true, unique: true }, // e.g., "Burger King"
    // can be productType or business type
    businessCategory: {
        type: [String],
        // enum: ["Formal Wear", "Casual Wear", "Outerwear", "Athletic Wear", "Traditional Wear", "Seasonal Wear", "Workwear", "Nightwear", "Accessories"]
    },

    businessLogo: { type: String, required: true },
    businessBanner: { type: String, required: false },
    address: { type: String, required: false },
    ownerName: { type: String, required: true },
    operatingHours: {
        open: { type: String, required: true }, // e.g., "10:00 AM"
        close: { type: String, required: true }, // e.g., "9:00 PM"
    },

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }, // Reference to Product

        // {
        //     productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference to Product
        //     price: { type: Number, required: true }, // Shop-specific price
        //     availability: { type: Boolean, default: true }, // Whether the product is available in this shop
        // },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShopReview"
        }
    ], // References to reviews

    overallRating: {
        type: Number, default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    // geolocation: {
    //     latitude: { type: Number, required: true },
    //     longitude: { type: Number, required: true },
    // },
    // operationalStatus: { type: String, enum: ["Open", "Closed", "Busy"], default: "Closed" }

});

const Shop = mongoose.model("shop", shopSchema)
export default Shop