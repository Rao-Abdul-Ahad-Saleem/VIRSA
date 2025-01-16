import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosCustomer, axiosSeller } from "../lib/Axios";


export const useUserStore = create((set, get) => ({
    user: null,
    userRole: null,
    loading: false,
    checkingAuth: false,

    signup: async ({ name, email, password, confirmPassword, phone, address }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axiosCustomer.post("/register", { name, email, password, phone, address });
            console.log(res);
            set({ user: res?.data?.customer, loading: false, userRole: "customer" });
            console.log("After setting user:", get().user);
            toast.success("User Registered Successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    },

    signupSeller: async ({ name, email, password, confirmPassword, contactNumber }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axiosSeller.post("/register", { name, email, password, contactNumber });
            console.log(res);
            set({ user: res?.data?.seller, loading: false, userRole: "seller" });
            console.log("After setting user:", get().user);
            console.log(user);
            toast.success("Seller Registered Successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.res.data.message || "An error occurred");
        }

    },

    // login: async ({ email, password }) => {
    //     set({ loading: true });
    //     try {
    //         console.log("hello")
    //         const res_customer = await axiosCustomer.post("/login", { email, password })
    //         console.log("hello 2")
    //         console.log(res);
    //         set({ user: res_customer, loading: false, userRole: "customer" })
    //         console.log("After setting user:", get().user);
    //         console.log("hello 3")
    //         toast.success("User Logged In Successfully")

    //     } catch (error) {
    //         set({ loading: false });
    //         toast.error(error.response)
    //     }

    //     try {
    //         // If customer login fails, attempt to log in as a seller
    //         const res_seller = await axiosSeller.post("/login", { email, password });
    //         if (res_seller) {
    //             set({
    //                 user: res_seller,
    //                 loading: false,
    //                 userRole: "seller"
    //             })
    //             toast.success("Seller loged In Successfully");
    //         }
    //     } catch (error) {
    //         set({ loading: false });
    //         console.error("Seller login failed: ", error)
    //         toast.error(error.response.data.message || "Login Failed")
    //     }
    // },


    login: async ({ email, password }) => {
        set({ loading: true });

        try {
            // Attempt to log in as a customer first
            const res_customer = await axiosCustomer.post("/login", { email, password });
            console.log(res_customer);
            if (res_customer.data.customer) {
                set({
                    user: res_customer.data.customer,
                    loading: false,
                    userRole: "customer"
                });
                toast.success("Customer Logged In Successfully");
                return; // Exit the function if the customer login is successful
            }
        } catch (error) {
            console.warn("Customer login failed. Trying seller login...");
            console.warn(error);
        }

        try {
            // If customer login fails, attempt to log in as a seller
            const res_seller = await axiosSeller.post("/login", { email, password });
            if (res_seller.data.seller) {
                set({
                    user: res_seller.data.seller,
                    loading: false,
                    userRole: "seller"
                });
                console.log(get().user);
                toast.success("Seller Logged In Successfully");
            }
        } catch (error) {
            console.error("Seller login failed:", error);
            // toast.error(error.response?.data?.message || "Login failed");
            toast.error("Unfortunately, no Seller or Customer matches these credentials")
            set({ loading: false });
        }
    },

    // checkAuth: async () => {
    //     set({ checkingAuth: true });
    //     try {
    //         const response = await axiosCustomer.get('/profie');
    //         set({ user: response.data, checkingAuth: false, userRole: "customer" });

    //     } catch (error) {
    //         console.warn("Customer login failed. Trying seller login...");
    //         console.warn(error);
    //     }

    //     try {
    //         // If customer login fails, attempt to log in as a seller
    //         const res_seller = await axiosSeller.get("/profile");
    //         if (res_seller.data.seller) {
    //             set({
    //                 user: res_seller.data.seller,
    //                 checkingAuth: false,
    //                 userRole: "seller"
    //             });
    //             toast.success("Seller Authenticated Successfully");
    //         }
    //     } catch (error) {
    //         set({ checkingAuth: false, user: null });

    //         toast.error("Your Session is expired. Try login again!");
    //         console.log(error || error.message);

    //     }
    // }

    checkAuth: async () => {
        set({ checkingAuth: true });

        try {
            // Attempt customer authentication
            const res_customer = await axiosCustomer.get('/profile');
            console.log(res_customer);
            if (res_customer.data.customer) {
                set({
                    user: res_customer.data,
                    checkingAuth: false,
                    userRole: "customer"
                });
                toast.success("Customer logged In Successfully");
                // console.log(get().userRole)

                return; // Exit early if customer authentication succeeds
            }

        } catch (error) {
            console.warn("Customer login failed. Trying seller login...");
            // console.warn(error.message || error);
        }

        try {
            // Attempt seller authentication
            const res_seller = await axiosSeller.get("/profile");
            if (res_seller.data.seller) {
                set({
                    user: res_seller.data.seller,
                    checkingAuth: false,
                    userRole: "seller"
                });
                toast.success("Seller Authenticated Successfully");
            } else {
                throw new Error("Seller data not found.");
            }
        } catch (error) {
            set({
                checkingAuth: false,
                user: null,
                userRole: null // Reset the userRole if both authentications fail
            });
            // toast.error("Your session has expired. Please log in again.");
            console.error(error.message || error);
        }
    },

    logout: async () => {
        try {
            set({ loading: true });
            // const res = await axiosCustomer.post('/logout');
            // set({ user : null, checkingAuth: true})
            const role = get().userRole
            if (!role) {
                throw new Error("User role is not defined.");
            }
            console.log(role);
            if (role == 'customer') {
                const res = await axiosCustomer.post('/logout')
            }
            else {
                const res = await axiosSeller.post("/logout")
            }
            console.log(`before logout in store`)
            set({ user: null, userRole: null, loading: false })
            console.log(`here is user  : ${get().user}`);
            // console.log(`After logout in store`)
        } catch (error) {
            set({ loading: false });
            // toast.error("Failed to logout")
            const errorMessage = error.response?.data?.message || "Failed to logout";
            toast.error(errorMessage);
        }


    }

    // logout: async () => {
    //     try {
    //         set({ loading: true }); // Indicate the logout process has started

    //         const role = get().userRole;
    //         if (!role) {
    //             throw new Error("User role is not defined.");
    //         }

    //         // Call the appropriate logout endpoint based on the role
    //         const logoutAPI = role === 'customer' ? axiosCustomer : axiosSeller;
    //         console.log(logoutAPI);
    //         await logoutAPI.post('/logout');

    //         // Reset user state on successful logout
    //         set({ user: null, userRole: null, loading: false });
    //         toast.success("Successfully logged out.");
    //     } catch (error) {
    //         set({ loading: false }); // Ensure loading state is reset
    //         const errorMessage = error.response?.data?.message || "Failed to logout";
    //         toast.error(errorMessage);
    //     }
    // },

}));