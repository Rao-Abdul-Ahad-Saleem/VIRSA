import { create } from 'zustand'
import { axiosShop } from '../lib/Axios';
import { toast } from 'react-toastify';

export const useShopStore = create((set, get) => ({
    shops: [],
    loading: false,
    error: null,

    addShop: async (formData) => {
        try {
            set({ loading: true });
            const response = await axiosShop.post("/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            // console.log(response);
            set({ shops: response?.data, loading: false })
            toast.success(response.data.message)
        } catch (error) {
            set({ loading: false, error: "Failed to fetch products" })
            toast.error(error.response.data.message)
        }
    }
}))