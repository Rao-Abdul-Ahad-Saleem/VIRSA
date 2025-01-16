import Product from "../model/productmodel.js";
import cloudinary from "../middleware/cloudinary.js";
import streamifier from 'streamifier'
import fs from "fs"



// const getImagePublicId = (url) => {
//     const path = url.split('/').pop() // first spliting the string in to array where we found /. Then extracting the last index value through pop method as there is a public id stord there with file type name like .png
//     return path.split('.')[0] // spliting the image name in to array like [businessLogo, png] from businessLogo.png and then extrating the first element of array which is public id
// }

const getImagePublicId = (url) => {
    const lastPart = url.split('/').pop() // first spliting the string in to array where we found /. Then extracting the last index value through pop method as there is a public id stord there with file type name like .png
    return lastPart.split(".")[0]; // spliting the image name in to array like [businessLogo, png] from businessLogo.png and then extrating the first element of array which is public id
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "product details", products });
    } catch (error) {
        res.status(500).json({ message: "error getting product details", error });
    }
};



export const addProduct = async (req, res) => {
    // console.log("hello");
    try {
        const seller = req.seller;
        // console.log(seller);
        const { name, description, price, category, searchKeywords, sizes, instructions, colors, features, shopName } = req.body;
        // console.log("are you there");

        const parsedSizes = JSON.parse(sizes); // Parse sizes from string to array
        const parsedSearchKeywords = JSON.parse(searchKeywords); // Parse searchKeywords
        const parsedFeatures = JSON.parse(features); // Parse Features
        const parsedInstructions = JSON.parse(instructions); // Parse Instrunctions
        const parsedColors = JSON.parse(colors); // Parse Instrunctions
        // console.log(parsedColors);


        // this is to fetch the shop which is provided by the seller to add product in that shop
        const productShop = seller.shops.find((item) => item.shopName == shopName)
        // console.log(productShop);
        // console.log(category)

        // Validate required fields
        if (!name || !description || !price || !category || !parsedSizes || !parsedSearchKeywords || !parsedInstructions || !colors || !parsedFeatures || !shopName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const images = req.processedImages; // Multer provides files in req.files
        if (!images || images.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        // Upload images to Cloudinary
        const imageUploads = await Promise.all(
            images.map((imagePath) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: "products", resource_type: "auto" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    fs.createReadStream(imagePath).pipe(uploadStream);
                    // streamifier.createReadStream(file.buffer).pipe(uploadStream);  // before processImage function of multer we receiving the buffer but now we receive a path
                });
            })
        );

        console.log(imageUploads);

        // Now in shop, we only add the id of the shop

        // Save product details and image URLs in the database
        const newProduct = await Product.create({
            name,
            shop: productShop?.shopId,  // Only the shopId
            instructions: parsedInstructions,
            description,
            price: parseFloat(price), // Ensure price is stored as a number
            category,
            colors: parsedColors,
            features: parsedFeatures,
            searchKeywords: parsedSearchKeywords, // Store the array of search keywords
            sizes: parsedSizes, // Store the sizes array
            images: imageUploads.map((image) => ({
                url: image.secure_url, // Cloudinary URL
                altText: name, // Using product name as altText (you can modify this as needed)
            })),
        });


        return res.status(200).json({
            message: "Product Created Successfully",
            newProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in creating product",
            error: error.message || error,
        });
    }
};




export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                message: "Unfortunately there is no such product exists",
            })
        };

        const images_array = product?.images

        await Promise.all(
            images_array.map(async (image) => {
                console.log(image);
                // this image is a map . grab the url from it like image.url
                const public_id = getImagePublicId(image?.url);
                try {
                    await cloudinary.uploader.destroy(`products/${public_id}`);
                    console.log(`Deleted Image : ${public_id}`);
                } catch (error) {
                    console.error(`Failed to delete image : ${public_id}`, error)
                }
            })
        );



        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Product deleted successfully"
        })


    } catch (error) {
        return res.status(500).json({
            message: "Error in deleting the product",
            error: error.message || message
        })
    }
}

export const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.status(200).json({
            message: "Fetched this product data",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in getting product of provided Id",
            error: error.message || error
        })

    }
}

// // Example Query to Fetch Product Details with Reviews and User Profiles
// const productDetails = await Product.findById(productId)
//   .populate({
//     path: "reviews",
//     populate: {
//       path: "userId", // Populate user details in reviews
//       select: "name profilePicture", // Select only the required fields
//     },
//   });

// This query retrieves:

// Product Information (name, price, category, etc.).
// Reviews:
// User’s name and profile picture (from User schema).
// Rating and comment (from Review schema)



// // Output Schema Should be like :

// {
//     "name": "Laptop",
//         "category": "Electronics",
//             "price": 1000,
//                 "reviews": [
//                     {
//                         "rating": 5,
//                         "comment": "Great product!",
//                         "userId": {
//                             "name": "John Doe",
//                             "profilePicture": "john.jpg"
//                         },
//                         "date": "2024-11-21T10:00:00Z"
//                     },
//                     {
//                         "rating": 4,
//                         "comment": "Good value for money",
//                         "userId": {
//                             "name": "Jane Smith",
//                             "profilePicture": "jane.jpg"
//                         },
//                         "date": "2024-11-20T10:00:00Z"
//                     }
//                 ]
// }





// // To calculate the average rating for a product:
// // Use MongoDB’s aggregation pipeline to compute the average of all ratings for a product’s reviews.

// const calculateAverageRating = async (productId) => {
//     const reviews = await Review.find({ productId }); // Get all reviews for the product

//     if (reviews.length === 0) return 0;

//     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//     const averageRating = totalRating / reviews.length;

//     // Update the product's overall rating
//     await Product.findByIdAndUpdate(productId, { overallRating: averageRating });

//     return averageRating;
// };



// This below function help to apply filter or fetch the product with specified rating :

// const product = await Product.findById(productId).populate({
//     path: "reviews",
//     match: { rating: { $gte: 4 } }, // Only populate reviews with a rating of 4 or higher
//   });

// // Another example of fetching details :
// const review = await Review.findById(reviewId)
//   .populate("userId", "name email") // Populate user details
//   .populate("productId", "name price"); // Populate product details
