import Shop from "../model/ShopModel.js"
import cloudinary from "../middleware/cloudinary.js";
import streamifier from 'streamifier'


// Helper function to upload buffer to Cloudinary

const uploadBufferToCloudinary = (buffer, folder, filename) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, public_id: filename, resource_type: 'image' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result?.secure_url);
                }
            }
        );

        // Convert buffer to stream and pipe it to Cloudinary
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

const getPublicIdOfShopImages = (url) => {
    const lastPart = url.split('/').pop() // first spliting the string in to array where we found /. Then extracting the last index value through pop method as there is a public id stord there with file type name like .png
    return lastPart.split(".")[0]; // spliting the image name in to array like [businessLogo, png] from businessLogo.png and then extrating the first element of array which is public id
}


export const addShop = async (req, res) => {
    try {

        const seller = req.seller

        // console.log(req.files)
        const businessLogo = req.files?.businessLogo[0];
        // console.log(businessLogo);
        const businessBanner = req.files?.businessBanner[0];
        // console.log('Hello2')
        if (!businessLogo || !businessBanner) {
            return res.status(400).json({ message: 'Both businessLogo and businessBanner are required' });
        }




        // // Upload buffers to Cloudinary


        // const logoResult = cloudinary.uploader.upload_stream(
        //     { resource_type: 'image' },
        //     (error, result) => {
        //         if (error) throw new Error('Error uploading businessLogo');
        //         return result.secure_url; // Cloudinary URL for the image
        //     }
        // ).end(businessLogo.buffer);

        const logoResultSecureUrl = await uploadBufferToCloudinary(
            businessLogo.buffer,
            'shops',
            'businessLogo'
        );

        console.log('Hello4')
        const bannerResultSecureUrl = await uploadBufferToCloudinary(
            businessBanner.buffer,
            'shops',
            'businessBanner'
        );

        console.log('Hello5')


        const { businessName, businessCategory, ownerName, address, operatingHours } = req.body;



        // console.log('Hello6')

        const parsedbusinessCategory = JSON.parse(businessCategory);
        // console.log(parsedbusinessCategory);
        const parsedOperatingHours = JSON.parse(operatingHours);
        // console.log(parsedOperatingHours);

        // Check for existing shop
        const shopExist = await Shop.findOne({ businessName });
        if (shopExist) {
            return res.status(400).json({ message: `Shop already exists for ${businessName} ` });
        }



        // Create new shop
        const newShop = await Shop.create({
            businessName,
            ownerName,
            operatingHours: parsedOperatingHours,
            address,
            businessLogo: logoResultSecureUrl, // Cloudinary URL
            businessCategory: parsedbusinessCategory,
            businessBanner: bannerResultSecureUrl, // Cloudinary URL
        });

        seller?.shops.push({
            shopId: newShop._id,
            shopName: newShop.businessName
        });
        await seller.save();

        return res.status(200).json({
            message: 'Shop Created Successfully',
            newShop,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error in creating or adding Store',
            error: error.message,
        });
    }
};

// export const deleteShop = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const shop = await Shop.findById(id);
//         if (!shop) {
//             return res.status(400).json({
//                 message: "Error in finding the shop for provided id",

//             })
//         }

//         if (shop.businessLogo) {
//             // const image_name = product.businessLogo.split('/').pop() // first spliting the string in to array where we found /. Then extracting the last index value through pop method as there is a public id stord there with file type name like .png
//             // const public_id = image_name.split(".")[0]; // spliting the image name in to array like [businessLogo, png] from businessLogo.png and then extrating the first element of array which is public id
//             const public_id_logo = getPublicIdOfShopImages(shop.businessLogo);
//             console.log(public_id_logo);
//             try {
//                 await cloudinary.uploader.destroy(`shops/${public_id_logo}`)
//                 res.json({
//                     message: "Shop logo deleted successfully"
//                 })
//             } catch (error) {
//                 res.json({
//                     message: "Error in deleting businessLogo of Shop from cloudinary",
//                     error: error.message || error
//                 })
//             }
//         }

//         if (shop.businessBanner) {
//             // const image_name = product.businessLogo.split('/').pop() // first spliting the string in to array where we found /. Then extracting the last index value through pop method as there is a public id stord there with file type name like .png
//             // const public_id = image_name.split(".")[0]; // spliting the image name in to array like [businessLogo, png] from businessLogo.png and then extrating the first element of array which is public id
//             const public_id_banner = getPublicIdOfShopImages(shop.businessBanner);
//             console.log(public_id_banner);
//             try {
//                 await cloudinary.uploader.destroy(`shops/${public_id_banner}`)
//                 res.json({
//                     message: "Shop Banner deleted successfully"
//                 })
//             } catch (error) {
//                 res.json({
//                     message: "Error in deleting businessBanner of shop from cloudinary",
//                     error: error.message || error
//                 })
//             }
//         }

//         await Shop.findByIdAndDelete(id);
//         return res.status(200).json({
//             message: "Shop is deleted successfully",
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message: "Error in deleting the shop",
//             error: error.message || error
//         })
//     }
// }

export const deleteShop = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the shop in the database
        const shop = await Shop.findById(id);
        if (!shop) {
            return res.status(400).json({
                message: "Shop not found for the provided ID",
            });
        }

        // Attempt to delete businessLogo from Cloudinary
        if (shop.businessLogo) {
            const public_id_logo = getPublicIdOfShopImages(shop.businessLogo);
            try {
                await cloudinary.uploader.destroy(`shops/${public_id_logo}`);
                console.log("Shop Logo deleted successfully:", public_id_logo);
            } catch (error) {
                console.error("Error deleting businessLogo:", error.message || error);
            }
        }

        // Attempt to delete businessBanner from Cloudinary
        if (shop.businessBanner) {
            const public_id_banner = getPublicIdOfShopImages(shop.businessBanner);
            try {
                await cloudinary.uploader.destroy(`shops/${public_id_banner}`);
                console.log("Shop Banner deleted successfully:", public_id_banner);
            } catch (error) {
                console.error("Error deleting businessBanner:", error.message || error);
            }
        }

        // Delete the shop from the database
        await Shop.findByIdAndDelete(id);

        // Final success response
        return res.status(200).json({
            message: "Shop and associated images deleted successfully",
        });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: "Error in deleting the shop",
            error: error.message || error,
        });
    }
};

// export const addShop = async (req, res) => {
//     try {

//         // const seller = req.seller;
//         console.log(req.body);
//         const { businessName, businessCategory, ownerName, address, operatingHours } = req.body

//         const businessLogo = req.files?.busienssLogo?.[0];
//         const businessBanner = req.files?.businessBanner?.[0];

//         // Upload buffers to Cloudinary
//         const logoResult = await uploadBufferToCloudinary(
//             businessLogo.buffer,
//             'shops',
//             'businessLogo'
//         );

//         const bannerResult = await uploadBufferToCloudinary(
//             businessBanner.buffer,
//             'shops',
//             'businessBanner'
//         );



//         // Validate files
//         if (!businessLogo || !businessBanner) {
//             return res.status(400).json({ message: 'Both businessLogo and businessBanner are required' });
//         }

//         console.log(businessName);
//         const addressExist = await Shop.findOne({ address });
//         if (addressExist) {
//             return res.status(400).json({
//                 message: "Their is already a shop registered with this address",
//                 address
//             })
//         };
//         console.log("hello1");

//         const businessNameExist = await Shop.findOne({ businessName });
//         if (businessNameExist) {
//             return res.status(400).json({
//                 message: "This business name is already registered. Try another one!",
//                 businessName
//             })
//         }

//         const shopExist = await Shop.findOne({ businessName, address, ownerName })
//         if (shopExist) {
//             return res.status(400).json({

//                 message: "Shop already exists with you given business name, address and owner name."
//                 // shopExist
//             })
//         }

//         const parsedbusinessCategory = JSON.parse(businessCategory);
//         const parsedOperatingHours = JSON.parse(operatingHours);

//         console.log("hello2");

//         // const parsedSizes = JSON.parse(sizes); // Parse sizes from string to array
//         // const parsedSearchKeywords = JSON.parse(searchKeywords); // Parse searchKeywords
//         // const parsedInstructions = JSON.parse(instructions); // Parse Instrunctions
//         // const parsedColors = JSON.parse(colors); // Parse Instrunctions
//         // if the field you searching from findOne is required = true then findOne works well


//         const new_shop = await Shop.create({
//             businessName,
//             ownerName,
//             operatingHours: parsedOperatingHours,
//             address,
//             businessLogo: logoResult.secure_url,
//             businessCategory: parsedbusinessCategory,
//             businessBanner: bannerResult.secure_url

//         })

//         // if (new_shop) {
//         //     seller?.shops.push(new_shop?._id);
//         //     await seller.save();
//         // }
//         return res.status(200).json({
//             message: "Shop Created Successfully",
//             new_shop
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error in creating or adding Store",
//             error
//         })
//     }
// }

// Example Flow in Action
// User logs in and receives:

// Access token: 1-hour lifespan.
// Refresh token: 30-day lifespan.
// The user performs actions, and after 1 hour:

// The access token expires.
// The client detects a 401 error and uses the refresh token to get a new access token.
// The session continues without requiring the user to log in again.

// This flow ensures a secure and uninterrupted user experience.




// Client-Side Middleware or Interceptor:

// Libraries like Axios or Fetch in JavaScript provide mechanisms to intercept requests and responses.
// An Axios interceptor can detect 401 responses and automatically send a request to refresh the token:

// axios.interceptors.response.use(
//     response => response,
//     async error => {
//         if (error.response.status === 401) {
//             const refreshToken = getRefreshTokenFromCookies(); // Retrieve the refresh token
//             const newAccessToken = await getNewAccessToken(refreshToken);
//             // Retry the original request with the new token
//             error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             return axios(error.config);
//         }
//         return Promise.reject(error);
//     }
// );
