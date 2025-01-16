import mongoose from "mongoose";
const { Schema } = mongoose;

// const UserSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: ["please provide valid user "],
//             minlenght: [5, "name must be consist on 10 character"],
//             maxlenght: [20, "name must be consist on 20 character"],
//         },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         role: {
//             type: String,
//             enum: ["user", "admin"],
//             default: "user",
//         },
//         cartItems: [
//             {
//                 quantity: {
//                     type: Number,
//                     default: 1,
//                 },
//                 product: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "product.model",
//                 },
//             },
//         ],
//         // role: {type: String, default: 'user'},
//         // cart: [{
//         //     productId: {type: Schema.Types.ObjectId, ref: 'Product'},
//         //     quantity: {type: Number, default: 1}
//         // }]
//     },
//     { timestamps: true }
// );

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     roles: {
//         type: [String], // Array of roles to support multiple roles per user
//         enum: ["customer", "shop_manager", "admin", "delivery_personnel", "support_staff", "super_admin"],
//         // First priority to set functions for customer, shop-manager and admin
//         default: ["customer"], // Default role is "customer"
//     },
//     phone: { type: String },

// });

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    // role: {
    //     type: String,
    //     default: "Customer",
    //     immutable: true,
    //     // required: true
    // },
    // {
    //     type: String,
    //     enum: ["Admin", "Shop Manager", "Customer"],
    //     default: "Customer" // Default role is "Customer" for general users
    // },

    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        },
    ],
    wishList: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            addedAt: {
                type: Date,
                default: Date.now
            },

        }
    ],
    phone: {
        type: String,
        match: /^[0-9]{4}[0-9]{7}$/,  // Regex Pattern to validate the number
        required: true,
    },
    address: { type: String },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],
    // orderHistory: [
    //     {
    //         orderId: String, // unique order identifier
    //         products: [
    //             {
    //                 productId: String, // product identifier
    //                 quantity: Number, // quantity of the product purchased
    //                 price: Number, // price of the product at time of purchase
    //                 date: Date // purchase date
    //             }
    //         ],
    //         totalPrice: Number, // total price of the order
    //         status: String, // order status (e.g., 'shipped', 'delivered')
    //         paymentMethod: String, // e.g., 'credit card', 'paypal'
    //     }
    // ],

    // *********         :)

    // // Search how to functional the browsing History 
    // browsingHistory: [
    //     {
    //         productId: String,  
    //         date: Date
    //     }
    // ]

    // // Make this functional when you make the product rating and resturuant rating functional
    //     reviews: [
    //      {
    //        productId: String,
    //        rating: Number,
    //        comment: String,
    //        date: Date
    //      }
    //    ],
});

const Customer = mongoose.model("customer", customerSchema);
export default Customer;
