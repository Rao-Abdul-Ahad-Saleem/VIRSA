import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { useShopStore } from '../stores/useShopStore';
import { Loader, PlusCircle } from 'lucide-react';
const CreateShopForm = () => {

    const [businessName, setBusinessName] = useState("")
    const [businessCategory, setBusinessCategory] = useState([])
    const [address, setAddress] = useState("")
    const [ownerName, setOwnerName] = useState("")
    const [operatingHours, setOperatingHours] = useState({ open: '', close: '' })
    const [businessLogo, setBusinessLogo] = useState(null)
    const [businessBanner, setBusinessBanner] = useState('')

    const { loading, addShop } = useShopStore();

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0]
        setBusinessLogo(file);
    }

    const handleRemoveLogo = () => {
        // setBusinessLogo("");
        if (businessLogo) {
            URL.revokeObjectURL(businessLogo);
        }
        setBusinessLogo(null);
    };

    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        setBusinessBanner(file);
    }

    const handleRemoveBanner = () => {
        setBusinessBanner("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('businessName', businessName);
        formData.append('businessCategory', JSON.stringify(businessCategory)); // Convert to string
        formData.append('address', address);
        formData.append('ownerName', ownerName);
        formData.append('operatingHours', JSON.stringify(operatingHours)); // Add Operating Hours object in string
        formData.append('businessLogo', businessLogo); // Add business logo 
        formData.append('businessBanner', businessBanner);

        // await axios.post("http://localhost:8000/shop/add", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     withCredentials: true, // Allow Credentials (cookies)
        // });  // Call the Zustand API action

        await addShop(formData);
    }

    return (
        <div>
            <motion.div
                className='bg-yellow-300 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto mt-5'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className='text-2xl font-semibold mb-6 text-slate-700'>Create Shop</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Business name */}
                    <div>
                        <label htmlFor='businessName' className='block text-sm font-medium'>
                            Business Name
                        </label>
                        <input
                            type='text'
                            id='businessName'
                            name='businessName'
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                            required
                        />
                    </div>

                    {/* Business Address */}
                    <div>
                        <label htmlFor='address' className='block text-sm font-medium'>
                            Business Address
                        </label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                            required
                        />
                    </div>

                    {/* Owner Name */}
                    <div>
                        <label htmlFor='ownerName' className='block text-sm font-medium'>
                            Owner Name
                        </label>
                        <input
                            type='text'
                            id='ownerName'
                            name='ownerName'
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                            required
                        />
                    </div>

                    {/* Business Type */}
                    <div>
                        <label htmlFor='businessCategory' className='block text-sm font-medium'>
                            Business Category
                        </label>
                        <input
                            type="text"
                            placeholder='You can add more than one type like "Formal, Casual, ..." '
                            value={businessCategory.join(', ')}
                            onChange={(e) => setBusinessCategory(e.target.value.split(',').map((keyword) => keyword.trim()))}
                            className='mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3'
                            required
                        />
                    </div>

                    {/* Operating Hours */}
                    <div>
                        <p className='text-sm font-medium'>Set the Operating times for your Shop</p>
                        <label htmlFor='openTime' className='text-sm font-medium px-2'>
                            Opening Time
                        </label>
                        <input
                            type='time'
                            id='openTime'
                            name='openTime'
                            value={operatingHours.open}
                            onChange={(e) => setOperatingHours({ ...operatingHours, open: e.target.value })}
                            className='mt-1 bg-stone-300 rounded-md shadow-sm py-2 px-3'
                            required
                        />

                        <label htmlFor='closeTime' className='text-sm font-medium px-2'>
                            Closing Time
                        </label>
                        <input
                            type='time'
                            id='closeTime'
                            name='closeTime'
                            value={operatingHours.close}
                            onChange={(e) => setOperatingHours({ ...operatingHours, close: e.target.value })}
                            className='mt-1 bg-stone-300 rounded-md shadow-sm py-2 px-3'
                            required
                        />
                    </div>

                    {/* Business Logo */}
                    <div>
                        <label htmlFor="businessLogo" className="block text-sm font-medium">
                            Add the logo or profile picture of your Business
                        </label>
                        <input
                            id='busienssLogo'
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="mt-1 bg-stone-300 rounded-md shadow-sm py-2 px-3"
                        />

                    </div>

                    {/* Preview of Business Logo */}
                    <div>
                        {businessLogo && (
                            <div className="mr-4 mb-4 relative w-36">
                                <img
                                    src={URL.createObjectURL(businessLogo)}
                                    alt={`Preview ${businessLogo}`}
                                    className=" w-32 h-24 object-contain rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveLogo}
                                    className="absolute  top-0 right-0 text-white bg-red-600 hover:bg-red-700 rounded-full px-2 py-1 text-xs"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Business Banner */}
                    <div>
                        <label htmlFor="businessBanner" className="block text-sm font-medium">
                            Add the Banner of your Business
                        </label>
                        <input
                            id='businessBanner'
                            type="file"
                            accept="image/*"
                            onChange={handleBannerUpload}
                            className="mt-1 bg-stone-300 rounded-md shadow-sm py-2 px-3"
                        />

                        {businessBanner && (
                            <div className="mr-4 mb-4 relative w-36">
                                <img
                                    src={URL.createObjectURL(businessBanner)}
                                    alt={`Preview ${businessBanner}`}
                                    className=" w-32 h-24 object-contain rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveBanner}
                                    className="absolute  top-0 right-0 text-white bg-red-600 hover:bg-red-700 rounded-full px-2 py-1 text-xs"
                                >
                                    &times;
                                </button>
                            </div>
                        )}

                    </div>

                    {/* Preview Banner */}
                    {/* <div>
                        {businessBanner && (
                            <div className="mr-4 mb-4 relative w-36">
                                <img
                                    src={URL.createObjectURL(businessBanner)}
                                    alt={`Preview ${businessBanner}`}
                                    className=" w-32 h-24 object-contain rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBanner(businessBanner)}
                                    className="absolute  top-0 right-0 text-white bg-red-600 hover:bg-red-700 rounded-full px-2 py-1 text-xs"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div> */}


                    {/* Submit Button */}
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
                                <p>{' '} Create Shop </p>
                            </>
                        )
                        }
                    </button>




                </form>

            </motion.div>
        </div>

    );
}

export default CreateShopForm


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const CreateShopForm = () => {
//     const [formData, setFormData] = useState({
//         businessName: "",
//         businessCategory: [],
//         address: "",
//         ownerName: "",
//         operatingHours: { open: "", close: "" },
//         businessLogo: "",
//         businessBanner: "",
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };


//     const handleFileUpload = (e, type) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prev) => ({ ...prev, [type]: file }));
//         }
//     };

//     const handleRemoveFile = (type) => {
//         setFormData((prev) => ({ ...prev, [type]: "" }));
//     };



//     // const handleSubmit = async (e) => {
//     //     e.preventDefault(); // Prevent the default form submission behavior
//     //     const data = new FormData(); // Create a new FormData object to handle the form data

//     //     Object.keys(formData).forEach((key) => {
//     //         // Loop through each key in the formData object
//     //         data.append(
//     //             key, // The name of the field (used as the key for the form data)
//     //             key === "businessType"
//     //                 ? JSON.stringify(formData[key]) // If the key is "businessType", convert the array to a JSON string
//     //                 : key === "operatingHours"
//     //                     ? JSON.stringify(formData[key]) // If the key is "operatingHours", also convert the object to a JSON string
//     //                     : formData[key] // Otherwise, append the value as is
//     //         );
//     //     });

//     //     console.log("Submitted Data:", data); // Log the form data to the console for debugging

//     //     // Perform API call here to submit the form data to the backend (e.g., using axios or fetch)
//     //     await axios.post("http://localhost:8000/shop/add", data)
//     // };

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent the default form submission behavior
//         const data = new FormData(); // Create a new FormData object to handle the form data

//         Object.keys(formData).forEach((key) => {
//             data.append(
//                 key,
//                 key === "businessCategory" || key === "operatingHours"
//                     ? JSON.stringify(formData[key]) // Convert arrays or objects to JSON strings
//                     : formData[key]
//             );
//         });

//         // Debugging: Log the contents of FormData
//         for (let [key, value] of data.entries()) {
//             console.log(`${key}: ${value}`);
//         }

//         // Perform API call here to submit the form data to the backend
//         await axios.post("http://localhost:8000/shop/add", data, {
//             headers: {
//                 "Content-Type": "multipart/form-data", // Ensure the header is set for FormData
//             },
//         });
//     };


//     return (
//         <div>
//             <motion.div
//                 className="bg-yellow-300 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto mt-5"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//             >
//                 <h2 className="text-2xl font-semibold mb-6 text-slate-700">Create Shop</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/** Business Name */}
//                     <InputField
//                         label="Business Name"
//                         id="businessName"
//                         value={formData.businessName}
//                         onChange={handleInputChange}
//                         required
//                     />

//                     {/** Business Address */}
//                     <InputField
//                         label="Business Address"
//                         id="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         required
//                     />

//                     {/** Owner Name */}
//                     <InputField
//                         label="Owner Name"
//                         id="ownerName"
//                         value={formData.ownerName}
//                         onChange={handleInputChange}
//                         required
//                     />

//                     {/** Business Type */}
//                     <div>
//                         <label htmlFor="businessCategory" className="block text-sm font-medium">
//                             Business Categories
//                         </label>
//                         <input
//                             type="text"
//                             id="businessCategory"
//                             name="businessCategory"
//                             value={formData.businessCategory.join(", ")}  // Add a space after each comma to separate categories with space
//                             onChange={(e) =>
//                                 setFormData((prev) => ({
//                                     ...prev,
//                                     businessCategory: e.target.value
//                                         .split(",")
//                                         .map((type) => type.trim())  // Split by commas and trim spaces around the words
//                                 }))
//                             }
//                             className="mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3"
//                             required
//                         />
//                     </div>

//                     {/* <div>
//                         <label htmlFor="businessCategory" className="block text-sm font-medium">
//                             Business Categories
//                         </label>
//                         <input
//                             type="text"
//                             id="businessCategory"
//                             name="businessCategory"
//                             value={formData.businessCategory.join(", ")}  // Categories separated by comma and space
//                             onChange={(e) =>
//                                 setFormData((prev) => ({
//                                     ...prev,
//                                     businessCategory: e.target.value
//                                         .split(",") // Split input by commas
//                                         .map((type) => type.trim()) // Trim spaces from each category
//                                         .filter((type) => type) // Remove empty entries in case of extra commas or spaces
//                                 }))
//                             }
//                             className="mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3"
//                             required
//                         />
//                     </div> */}


//                     {/** Operating Hours */}
//                     <div>
//                         <p className="text-sm font-medium">Set the Operating times for your Shop</p>
//                         <InputField
//                             label="Opening Time"
//                             id="openTime"
//                             type="time"
//                             value={formData.operatingHours.open}
//                             onChange={(e) =>
//                                 setFormData((prev) => ({
//                                     ...prev,
//                                     operatingHours: { ...prev.operatingHours, open: e.target.value },
//                                 }))
//                             }
//                             required
//                         />
//                         <InputField
//                             label="Closing Time"
//                             id="closeTime"
//                             type="time"
//                             value={formData.operatingHours.close}
//                             onChange={(e) =>
//                                 setFormData((prev) => ({
//                                     ...prev,
//                                     operatingHours: { ...prev.operatingHours, close: e.target.value },
//                                 }))
//                             }
//                             required
//                         />
//                     </div>

//                     {/** File Uploads */}
//                     <FileUpload
//                         label="Business Logo"
//                         id="businessLogo"
//                         file={formData.businessLogo}
//                         onUpload={(e) => handleFileUpload(e, "businessLogo")}
//                         onRemove={() => handleRemoveFile("businessLogo")}
//                     />
//                     <FileUpload
//                         label="Business Banner"
//                         id="businessBanner"
//                         file={formData.businessBanner}
//                         onUpload={(e) => handleFileUpload(e, "businessBanner")}
//                         onRemove={() => handleRemoveFile("businessBanner")}
//                     />

//                     {/** Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
//                     >
//                         Create Shop
//                     </button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };


// const InputField = ({ label, id, ...props }) => (
//     <div>
//         <label htmlFor={id} className="block text-sm font-medium">
//             {label}
//         </label>
//         <input
//             id={id}
//             name={id}
//             className="mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3"
//             {...props}
//         />
//     </div>
// );

// const FileUpload = ({ label, id, file, onUpload, onRemove }) => (
//     <div>
//         <label htmlFor={id} className="block text-sm font-medium">
//             {label}
//         </label>
//         <input
//             id={id}
//             type="file"
//             accept="image/*"
//             onChange={onUpload}
//             className="mt-1 block w-full bg-stone-300 rounded-md shadow-sm py-2 px-3"
//         />
//         {file && (
//             <div className="mt-2 flex items-center">
//                 <img
//                     src={URL.createObjectURL(file)}
//                     alt="Preview"
//                     className="w-16 h-16 object-cover rounded-md"
//                 />
//                 <button
//                     type="button"
//                     onClick={onRemove}
//                     className="ml-4 text-red-500 hover:text-red-700"
//                 >
//                     Remove
//                 </button>
//             </div>
//         )}
//     </div>
// );

// export default CreateShopForm;
