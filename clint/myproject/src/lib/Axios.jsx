import axios from "axios";

export const axiosCustomer = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL: "http://localhost:8000/api",
    // headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
    // credentials: "include", // Include cookies in requests
    // send cookies to the server
    withCredentials: true,
})

export const axiosSeller = axios.create({
    baseURL: "http://localhost:8000/seller",
    withCredentials: true,
})

export const axiosProduct = axios.create({

    baseURL: "http://localhost:8000/product",
    withCredentials: true,
})


export const axiosShop = axios.create({
    baseURL: "http://localhost:8000/shop",
    withCredentials: true,
})

export const axiosCart = axios.create({
    baseURL: "http://localhost:8000/cart",
    withCredentials: true,

})
