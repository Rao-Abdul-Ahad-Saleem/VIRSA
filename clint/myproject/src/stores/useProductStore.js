import { create } from 'zustand'
import { axiosProduct } from '../lib/Axios';
import { toast } from 'react-toastify';

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    // error: null,
    product: null,

    setProducts: (products) => set({ products }),

    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const response = await axiosProduct.get("/getAllProducts");
            set({ products: response?.data?.products, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false })
            console.log(error.response.data.error);
        }
    },


    addProduct: async (formData) => {
        try {
            set({ loading: true });
            const response = await axiosProduct.post('/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            set({ loading: false });
            toast.success(response.data.message || 'Product added successfully!');
        } catch (error) {
            set({ loading: false, error: error.message });
            toast.error('Error: ' + error.message);
        }
    },

    getSingleProduct: async (id) => {
        try {
            set({ loading: true });
            const res = await axiosProduct.get(`/getSingleProduct/${id}`)
            if (res) {
                // set({ product: res?.data?.product, loading: false })
                set({ loading: false });
                return res.data?.product;
            }
        } catch (error) {
            set({ loading: false });
            toast.error('Error : ' + error.message);
        }
    }


}))