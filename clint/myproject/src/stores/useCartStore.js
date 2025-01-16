// import { create } from 'zustand'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { axiosCart } from '../lib/Axios';

// export const useCartStore = create((set, get) => ({
//     cart: [],
//     coupon: null,
//     total: 0,
//     subtotal: 0,
//     isCouponApplied: false,

//     addToCart: async (product) => {
//         try {
//             console.log(product);
//             const res = await axiosCart.post("/addToCart", { productId: product._id });

//             set((prevState) => {
//                 const existingItem = prevState.cart.find((item) => item._id === product._id);
//                 const newCart = existingItem
//                     ? prevState.cart.map((item) =>
//                         item._id == product._id ? { ...item, quantity: item.quantity + 1 } : item
//                     ) : [...prevState.cart, { ...product, quantity: 1 }]
//                 return { cart: newCart };
//             });
//             toast.success(res.data.message);
//             // get().calculateTotals();
//         } catch (error) {
//             toast.error(error.response.data.message || "An Error to set Cart Product")
//         }
//     },
// })) 

import { create } from 'zustand';
import { toast } from 'react-toastify';
import { axiosCart } from '../lib/Axios';

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    // Function to add a product to the cart

    getCartItems: async () => {
        try {
            const res = await axiosCart.get(`/getCartItems`);
            console.log(res);
            set({ cart: res.data.cartItems })
            get().calculateTotals();
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response.data.message || "Error in getting cart items")
        }
    },
    addToCart: async (product) => {
        try {
            if (!product || !product._id) {
                toast.error("Invalid product data.");
                return;
            }
            console.log('h1')
            // console.log("Adding product to cart:", product);

            // Make API call to add product to the cart
            const response = await axiosCart.post("/addToCart", { productId: product._id });
            console.log(response);
            console.log('h2')

            // Update the cart state
            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id);

                const updatedCart = existingItem
                    ? prevState.cart.map((item) =>
                        item._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    : [...prevState.cart, { ...product, quantity: 1 }];
                // console.log(updatedCart);

                return { cart: updatedCart };
            });

            // Display success message
            toast.success(response.data.message || "Product added to cart!");
        } catch (error) {
            // Display error message
            const errorMessage = error?.response?.data?.message || "Failed to add product to cart.";
            console.error("Error adding product to cart:", errorMessage);
            toast.error(errorMessage);
        }
    },

    // getCartItems : async () => {
    //     const res = await 
    // },

    removeFromCart: async (productId) => {
        try {
            const res = await axiosCart.delete(`/removeFromCart/${productId}`)
            set((prevState) => (
                { cart: prevState.cart.filter((item) => item._id != productId) }
            ))
            get().calculateTotals();
        } catch (error) {
            console.error(error?.res?.data?.message);
        }
    },
    updateQuantity: async (productId, quantity) => {
        try {
            if (quantity == 0) {
                get().removeFromCart(productId);
                return;
            }
            const res = await axiosCart.put(`/updateQuantity/${productId}`, { quantity });
            set((prevState) => ({
                cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
            }))
            get().calculateTotals();
        } catch (error) {
            console.log(error.res.data.message);
        }
    },

    calculateTotals: () => {
        const { cart, coupon } = get();
        const subtotal = cart.reduce((sum, item) =>
            sum + item.price * item.quantity, 0
        )
        let total = subtotal;
        if (coupon) {
            const discout = subtotal * (coupon.discountPercentage / 100);
            total = subtotal - discout;
        }

        set({ subtotal, total });
    },


}));
