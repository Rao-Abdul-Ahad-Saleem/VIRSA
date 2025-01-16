import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Upload, Loader } from "lucide-react";
import axios from 'axios';
import { useProductStore } from '../stores/useProductStore';
import { useUserStore } from '../stores/useUserStore';




const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags", "Shirts", "Dress Pants", "Dress Shirts", "Cotton Pant"];


const CreateProduct = () => {
    const [name, setName] = useState('');
    const [shopName, setShopName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [searchKeywords, setSearchKeywords] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [colors, setColors] = useState([]);
    const [features, setFeatures] = useState([]);
    const [sizes, setSizes] = useState([{ size: '', stock: 0 }]); // Initialize with one size input
    const [images, setImages] = useState([]);

    const { user } = useUserStore();
    console.log(user);

    // This is to get the name of shops which user has and select one in which he wanted to add product
    const NameOfShops = user?.shops.map((item) => item.shopName) || [];  // This empty array ensures that shopsName will always be an array (either the result of map() or an empty array) even if user?.shops is undefined.
    // console.log(NameOfShops);


    const { addProduct, loading } = useProductStore();


    const handleSizeChange = (index, event) => {
        const updatedSizes = sizes.map((size, i) =>
            i === index ? { ...size, [event.target.name]: event.target.value } : size
        );
        setSizes(updatedSizes);
    };

    const handleAddSize = () => {
        setSizes([...sizes, { size: '', stock: 0 }]);  // Add another size input        
    };

    const handleRemoveSize = (index) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setSizes(updatedSizes);
    };

    // const handleImageChange = (e) => {

    //     const selectedFiles = Array.from(e.target.files);
    //     setImages(selectedFiles);
    //     console.log(images);
    // };

    const handleAddImage = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to an Array

        if (images.length + selectedFiles.length > 5) {
            alert("You can upload a maximum of 5 images.");
            return;
        }

        const newImages = selectedFiles.slice(0, 5 - images.length); // Limit to remaining slots

        setImages((prevImages) => [...prevImages, ...newImages]);


    };

    // const handleAddImage = (e) => {
    //     const selectedFiles = Array.from(e.target.files); // Convert FileList to an Array

    //     if (images.length + selectedFiles.length > 5) {
    //         alert("You can upload a maximum of 5 images.");
    //         return;
    //     }

    //     const newImages = selectedFiles.slice(0, 5 - images.length); // Limit to remaining slots

    //     newImages.forEach((file) => {
    //         if (file) {
    //             Resizer.imageFileResizer(
    //                 file,
    //                 300, // width
    //                 300, // height
    //                 "JPEG",  // format
    //                 70,  // quality
    //                 0, // Rotation
    //                 (uri) => {
    //                     setImages((prevImages) => [...prevImages, uri]); // Add resized image to the state
    //                 },
    //                 "base64" // output type
    //             );
    //         }
    //     });
    // };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append product details to FormData
        formData.append('name', name);
        formData.append('shopName', shopName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('searchKeywords', JSON.stringify(searchKeywords)); // Convert to string
        formData.append('instructions', JSON.stringify(instructions)); // Convert to string
        formData.append('colors', JSON.stringify(colors)); // Convert to string
        formData.append('features', JSON.stringify(features)); // Convert to string
        formData.append('sizes', JSON.stringify(sizes));  // Add sizes array as string
        images.forEach((file) => formData.append('images', file));


        // await axios.post("http://localhost:8000/product/add", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     withCredentials: true
        // });  // Call the Zustand API action

        await addProduct(formData)
    };

    return (
        // <form onSubmit={handleSubmit}>
        //     <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        //     <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        //     <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        //     <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        //     <input
        //         type="text"
        //         placeholder="Search Keywords (comma separated)"
        //         value={searchKeywords.join(', ')}
        //         onChange={(e) => setSearchKeywords(e.target.value.split(',').map(keyword => keyword.trim()))}
        //     />

        //     {/* Sizes input */}
        //     {sizes.map((size, index) => (
        //         <div key={index}>
        //             <input
        //                 type="text"
        //                 name="size"
        //                 placeholder="Size (e.g., S, M, L)"
        //                 value={size.size}
        //                 onChange={(e) => handleSizeChange(index, e)}
        //             />
        //             <input
        //                 type="number"
        //                 name="stock"
        //                 placeholder="Stock"
        //                 value={size.stock}
        //                 onChange={(e) => handleSizeChange(index, e)}
        //             />
        //             {sizes.length > 1 && (
        //                 <button type="button" onClick={() => handleRemoveSize(index)}>Remove Size</button>
        //             )}
        //         </div>
        //     ))}
        //     <button type="button" onClick={handleAddSize}>Add Another Size</button>

        //     {/* Image input */}
        //     <input type="file" multiple onChange={handleImageChange} />

        //     <button type="submit">Add Product</button>
        // </form>

        <motion.div
            className='bg-yellow-300 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto mt-5'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-2xl font-semibold mb-6 text-slate-700'>Create New Product</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* product name */}
                <div>
                    <label htmlFor='name' className='block text-sm font-medium'>
                        Product Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    />
                </div>
                {/* product description  */}
                <div>
                    <label htmlFor='description' className='block text-sm font-medium'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    />
                </div>

                {/* product price */}
                <div>
                    <label htmlFor='price' className='block text-sm font-medium'>
                        Price
                    </label>
                    <input
                        type='text'
                        id='price'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step='0.01'
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    />
                </div>
                {/* Product Category */}
                <div>
                    <label htmlFor='category' className='block text-sm font-medium'>
                        Category
                    </label>
                    <select
                        id='category'
                        name='category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    >
                        <option value=''>Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Product Shop */}
                <div>
                    <label htmlFor='shopName' className='block text-sm font-medium'>
                        Select Shop Name
                    </label>
                    <select
                        id='shopName'
                        name='shopName'
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    >
                        <option value=''>Select a Shop</option>
                        {NameOfShops.map((shop) => (
                            <option key={shop} value={shop}>
                                {shop}
                            </option>
                        ))}
                    </select>
                </div>


                {/* product seach keywords */}
                <div>
                    <label htmlFor='searchKeywords' className='block text-sm font-medium'>
                        Search Keywords for Product
                    </label>
                    <input
                        type="text"
                        placeholder="Search Keywords (comma separated)"
                        value={searchKeywords.join(', ')}
                        onChange={(e) => setSearchKeywords(e.target.value.split(',').map(keyword => keyword.trim()))}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    />
                </div>
                {/* Product Features */}
                <div>
                    <label htmlFor='searchKeywords' className='block text-sm font-medium'>
                        Add Product Features
                    </label>
                    <input
                        type="text"
                        placeholder="Search Keywords (comma separated)"
                        value={features.join(', ')}
                        onChange={(e) => setFeatures(e.target.value.split(',').map(keyword => keyword.trim()))}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    />
                </div>


                {/* Product Instructions */}
                <div>
                    <label htmlFor='searchKeywords' className='block text-sm font-medium'>
                        Add Instructions for Products
                    </label>
                    <input
                        type="text"
                        placeholder="Instrunctions (comma separated)"
                        value={instructions.join(', ')}
                        onChange={(e) => setInstructions(e.target.value.split(',').map(keyword => keyword.trim()))}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        required
                    />
                </div>

                {/* Product colors */}
                <div>
                    <label htmlFor='searchKeywords' className='block text-sm font-medium'>
                        Add Colors if Any
                    </label>
                    <input
                        type="text"
                        placeholder="Colors(comma separated)"
                        value={colors.join(', ')}
                        onChange={(e) => setColors(e.target.value.split(',').map(keyword => keyword.trim()))}
                        className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'

                    />
                </div>

                {/* Sizes input */}

                {sizes.map((size, index) => (

                    <div key={index} className='mt-0'>
                        <label htmlFor='sizes' className='block text-sm font-medium'>
                            Add Size and the Stock of that Size
                        </label>
                        <input
                            type="text"
                            name="size"
                            placeholder="Size (e.g., S, M, L)"
                            value={size.size}
                            onChange={(e) => handleSizeChange(index, e)}
                            className='mt-1 bg-stone-300 rounded-md shadow-sm py-2 px-3 mr-2'
                        />
                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={size.stock}
                            onChange={(e) => handleSizeChange(index, e)}
                            className='ml-2 mt-1 bg-stone-300 rounded-md shadow-sm py-2 px-3'
                        />
                        {sizes.length > 1 && (
                            <button type="button" onClick={() => handleRemoveSize(index)} className='text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 my-2'>Remove Size</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddSize} className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5'>Click to Add Another Size & Stock to that Size</button>


                {/* Image Upload */}
                <div>
                    <label htmlFor="images" className="block text-sm font-medium">
                        Upload Product Images (Max: 5)
                    </label>
                    <input
                        type="file"
                        name="images"

                        onChange={handleAddImage}
                        className="mt-1 bg-stone-300 rounded-md shadow-sm py-2 px-3"
                        accept="image/*"
                    />
                    {images.length < 5 && (
                        <p className="text-sm text-gray-500 mt-1">You can upload up to 5 images.</p>
                    )}
                </div>
                {/* Display Selected Images */}
                <div className="flex flex-wrap mt-4">
                    {images.map((image, index) => (
                        <div key={index} className="mr-4 mb-4 relative">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 text-white bg-red-600 hover:bg-red-700 rounded-full px-2 py-1 text-xs"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                {/* <div className="image-preview">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.uri}
                            alt={`Uploaded image ${index + 1}`}
                            style={{ width: "100px", height: "100px", margin: "5px" }}
                        />
                    ))}
                </div> */}

                {/* Submit Button */}
                {/* <button
                    className='w-full flex justify-center items-center bg-emerald-500 py-2 px-3 rounded-md shadow-sm text-sm font-medium hover:bg-emerald-400 disabled:opacity-50'
                    type='submit'


                >
                    Create Product
                </button> */}
                <button
                    className='w-full flex justify-center items-center bg-emerald-500 py-2 px-3 rounded-md shadow-sm text-sm font-medium hover:bg-emerald-400 transition duration-150 ease-in-out disabled:opacity-50'
                    disabled={loading}
                    type='submit'
                >
                    {loading ? (
                        <>
                            <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                            Loading ...
                        </>
                    ) : (
                        <>
                            <PlusCircle className='mr-2 h-5 w-5 inline' aria-hidden='true' />
                            <p>{' '} Create Product </p>
                        </>
                    )
                    }
                </button>







            </form>
        </motion.div>
    );
};

export default CreateProduct;
