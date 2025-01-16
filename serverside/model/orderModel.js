import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            name: String,
            // selected color of the product
            color : String,
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number, // Total cost of Order
    date: { type: Date, default: Date.now }, // Order Date
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'Shipped', 'delivered', 'cancelled']  // Order Status
    }
})

const Order = mongoose.model("order", orderSchema);
export default Order;
