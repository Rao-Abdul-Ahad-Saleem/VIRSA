import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true
        },
        instructions: {
            type: [String],
        },

        description: {
            type: String,

        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        // stock: {
        //     type: Number,
        //     min: 0,
        //     // required: true,
        // },

        // image: {
        //     type: [String],
        //     required: [true, "Image is required"],
        // },

        images: [
            {
                url: {
                    type: String, // Image URL
                    required: true,
                },
                altText: {
                    type: String, // Alternative text for accessibility or SEO
                    required: false,
                },
                uploadDate: {
                    type: Date, // Optional: Timestamp for when the image was uploaded
                    default: Date.now,
                },
            },
        ],

        category: {
            type: String,
            required: true,
        },

        features: {
            type: [String],
        },
        searchKeywords: {
            type: [String],
            // validator: function (keywords) {
            //     return keywords.length >= 5 && keywords.length <= 10;
            // },
            // message: 'The Search Keywords must contain between 5 and 10 keywords.',
            // required: true
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },


        sizes: [
            {
                size: {
                    type: String,
                    required: true
                    // Size name (e.g., "S", "M", "L", etc.)
                },
                stock: {
                    type: Number,
                    required: true,
                    min: 0,
                    validate: {
                        validator: (value) => value >= 0,
                        message: "Quantity cannot be less than 0"
                    }
                },
            }
        ], // e.g., ["S", "M", "L", "XL"]
        colors: [String], // e.g., ["Red", "Blue", "Black"]
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductReview"
            }
        ], // References to reviews

        overallRating: {
            type: Number, default: 0
        }, // Average rating calculated dynamically        

        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },

    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

