import Product from "../model/productmodel.js";

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body
        const user = req.customer;

        console.log('p1');

        const existingProduct = user.cartItems.find((item) => item.product.toString() == productId)

        if (existingProduct) {
            console.log(existingProduct);
            existingProduct.quantity += 1;
            await user.save();
            console.log('p2');
            return res.status(200).json({
                message: "Quantity updated of product in Cart",
            })
        }
        // try it without else and check result
        const product = await Product.findById(productId)
        console.log('p2');
        if (!product) {
            console.log('p3');
            return res.status(404).json({ message: "Product Not Found" })

        }
        console.log('p3');
        user.cartItems.push({
            product,
            quantity: 1
        })
        console.log('p4');

        await user.save();
        console.log('p5');

        return res.status(200).json({
            message: "Product Added to Cart",

        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in adding product to Cart",
            error: error.message || error
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const customer = req.customer;
        const updateCartItems = customer?.cartItems.filter((item) => item?.product.toString() !== productId);
        customer.cartItems = updateCartItems;
        await customer.save();
        return res.status(200).json({
            message: "Cart Item Removed Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in Removeing Cart Item"
        })
    }
}


export const updateQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(productId);
        const { quantity } = req.body;
        const customer = req.customer;
        console.log(customer.cartItems);
        console.log(quantity);

        console.log("p1");

        const updateProduct = customer.cartItems.find((item) => item.product.toString() == productId);
        console.log(updateProduct);
        if (!updateProduct) {
            console.log("p2");
            return res.status(400).json({
                message: "Unfortunately, there is not any product of provided ID"
            })
        }
        console.log("p2.1");
        updateProduct.quantity = quantity;
        await customer.save();

        return res.status(200).json({
            message: "Updatd the quantity Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in Updating Quantity of Product"
        })
    }
}

// export const updateQuantity = async (req, res) => {
//     try {
//         return res.status(200).json({
//             message: 'Hello',
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message || error
//         })
//     }
// }


// console.log(user);

// const existingProduct = user.cartItems.find((item) => item.product.toString() == productId)
// if (existingProduct) {
//     existingProduct.quantity += 1;
//     await user.save();
// } else {
//     // const product = await Product.findById(productId)
//     if (!product) {
//         return res.status(404).json({ message: "Prroduct not found" })
//     }

//     user.cartItems.push({
//         product,
//         quantity: 1,
//     })
//     await user.save();
// }
// res.status(200).json({ message: "Product added to cart" })












export const getCartItems = async (req, res) => {
    try {
        const user = req.customer

        // Extract product IDs from cart items
        const productIds = user.cartItems.map((cartItem) => cartItem.product);

        console.log('c1');

        // Fetch the products from the database
        const products = await Product.find({ _id: { $in: productIds } });
        console.log('c2');

        // Now merge the quantity of products with product details
        const cartItems = user.cartItems.map((cartItem) => {
            // Now finding the products of present in the cartItems and giving them the quantity attribute
            const product = products.find((p) => p._id, toString() == cartItem.product.toString());


            return {
                ...product.toJSON(),
                // to strip away Mongoose-specific metadata, leaving only raw data.
                quantity: cartItem.quantity

            }
        });
        console.log('c3');

        return res.status(200).json({
            message: "Successfully fetched the Cart Items",
            cartItems
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in fetching cart items",
            error: error.message || error
        })
    }

}