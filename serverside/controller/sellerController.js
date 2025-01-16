
import jwt from 'jsonwebtoken'
import { redis } from '../middleware/redis.js';
import Seller from '../model/sellerModel.js';
import bcrypt from 'bcrypt';
import Customer from '../model/customerModel.js';




const generateTokensSeller = async (sellerId) => {
    const accessTokenSeller = jwt.sign({ sellerId }, process.env.accessKeySeller, { expiresIn: '1d' }); //accessKeySelle
    const refreshTokenSeller = jwt.sign({ sellerId }, process.env.refreshKeySeller, { expiresIn: '7d' });
    return { accessTokenSeller, refreshTokenSeller }
}


const setSellerCookies = async (res, accessTokenSeller, refreshTokenSeller) => {

    res.cookie("accessTokenSeller", accessTokenSeller, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds

    });
    res.cookie("refreshTokenSeller", refreshTokenSeller, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

const storeTokenSeller = async (res, sellerId, refreshTokenSeller) => {
    try {
        await redis.set(`refreshToken ${sellerId}`, refreshTokenSeller, "EX", 7 * 24 * 60 * 60)   // Redis expects expiry in seconds

        //  Consider using a consistent format like seller:accessToken:<sellerId> for better organization and debugging.
    } catch (error) {
        res.status(500).json({
            message: "Error in storing the access token in the redis",
            error
        })
    }
}

// Now make a function ot register the seller 

export const register_seller = async (req, res) => {
    try {
        const { name, email, password, contactNumber } = req.body;
        const sellerExist = await Seller.findOne({ email });
        if (sellerExist) {
            return res.status(400).json({
                message: "Seller wtih this email already exist. Try another one!",
                sellerExist
            })
        }

        const customerOfThisEmail = await Customer.findOne({ email });
        if (customerOfThisEmail) {
            return res.status(400).json({
                message: "Your Email should be unique. So try aontoher one email to register"
            })
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const seller = await Seller.create({
            name,
            email,
            password: hashedpassword,
            contactNumber,

        })

        const { accessTokenSeller, refreshTokenSeller } = await generateTokensSeller(seller._id);

        await setSellerCookies(res, accessTokenSeller, refreshTokenSeller);
        await storeTokenSeller(res, seller._id, refreshTokenSeller);

        return res.status(200).json({
            message: "Seller Created Successfully",
            seller

        })

    } catch (error) {
        return res.status(500).json({
            message: "Error is creating new Seller",
            error: error.message || error  // send error details for debugging
        })
    }
}

export const login_seller = async (req, res) => {

    try {
        const { email, password } = req.body;

        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(400).json({
                message: "Seller with this email does not exist",
            })
        }


        const isMatch = await bcrypt.compare(password, seller.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentails",
            })
        }

        const { accessTokenSeller, refreshTokenSeller } = await generateTokensSeller(seller._id);
        await setSellerCookies(res, accessTokenSeller, refreshTokenSeller);  // first res then 2nd parameter is for accessToken and 3rd one is for refreshtoken 
        await storeTokenSeller(res, seller._id, refreshTokenSeller);


        return res.status(200).json({
            message: "Logged In Successfully",
            seller,
            accessTokenSeller

        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in logging in Seller",
            error: error.message || error
        })
    }
}


export const logout_seller = async (req, res) => {
    try {
        // console.log(req);
        console.log(req.cookies)
        const { refreshTokenSeller } = req.cookies
        if (!refreshTokenSeller) {
            return res.status(400).json({
                message: 'No refresh token founded'
            });
        }
        let decode;

        try {
            decode = jwt.verify(refreshTokenSeller, process.env.refreshKeySeller);   // Verify the accesstoken with the help of accessKey defined in the env file
            // console.log(decode);
        } catch (error) {
            return res.status(500).json({
                message: "Invalid access Token provided"
            })
        }

        const redisKey = `refreshToken ${decode?.sellerId}`;  // Setting the format of redis key stored in redis

        await redis.del(redisKey); // Deleting the redis key from redis with eventually leads to logout    

        // Clear Cookies
        res.clearCookie("accessTokenSeller", { httpOnly: true });
        res.clearCookie("refreshTokenSeller", { httpOnly: true });

        return res.status(200).json({
            message: "Seller logout Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in logging out Seller",
            error: error.message || error
        })
    }
}

export const DeleteSeller = async (req, res) => {
    try {
        const seller_id = req.params.id
        // console.log(seller_id);
        const seller = await Seller.findByIdAndDelete(seller_id);
        // console.log(seller);
        if (!seller) {
            return res.status(400).json({
                message: "No such Seller with given id is registered",
            })
        }
        return res.status(200).json({
            message: "Seller Deleted Successfully",
            seller
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in Delleting this Seller",
            error: error.message || error
        })
    }
}


// Get all Sellers data

export const sellers_data = async (req, res) => {
    try {
        const sellers = await Seller.find();
        return res.status(200).json({
            message: "Seller's data fetched successfully",
            sellers
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in fetching Seller's data",
            error: error.message || error
        })
    }
}

export const getProfile = async (req, res) => {

    try {
        const seller = req.seller
        console.log(seller);
        if (seller == undefined || seller == null) {
            return res.status(400).json({
                message: "Seller is undefined"
            })
        }
        res.status(200).json({
            message: `Successfully get the Seller profile`,
            seller
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

// export const updateSeller = async (req, res) => {
//     try {
//         const { id } = req.params
//         const updateInfo = req.body
//         const { shopId } = req.body
//         // console.log(updateInfo);
//         const seller = await Seller.findByIdAndUpdate(id, updateInfo);

//         return res.status(200).json({
//             message: "User is updated successfully",
//             seller
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error in updating seller',
//             error: error.message || error
//         })
//     }
// }

export const updateSeller = async (req, res) => {
    try {
        const { id } = req.params; // Extract seller ID from params
        const updateInfo = req.body; // Extract update info from request body

        // Use `findByIdAndUpdate` with `await` to execute the query
        const seller = await Seller.findByIdAndUpdate(
            id,
            updateInfo,
            { new: true } // Return the updated document
        );

        // Check if the seller exists before attempting an update
        if (!seller) {
            return res.status(404).json({
                message: "Seller not found",
            });
        }

        return res.status(200).json({
            message: "Seller updated successfully",
            seller,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in updating seller",
            error: error.message || error,
        });
    }
};


// export const add_shop = async (req, res) => {
//     try {
//         const shopData = req.body
//         console.log(shopData);
//         const { id } = req.params
//         const seller = await Seller.findById(id);
//         console.log("ss");
//         seller?.shops?.push(shopData);
//         console.log("ss");
//         return res.status(200).json({
//             message: "Successfully added the shop data",
//             seller
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error in adding shop data",
//             error: error.message || error
//         })
//     }
// }


// I have wrote this function to add shop from postman but this function is garbage as new id is generated by mongo db all the times which we don't want to generate
export const add_shop = async (req, res) => {
    try {
        const shopData = req.body; // Shop details from request body
        const { id } = req.params; // Seller ID from request params

        console.log("Shop data received:", shopData);

        const seller = await Seller.findById(id); // Find the seller by ID
        if (!seller) {
            return res.status(404).json({
                message: "Seller not found",
            });
        }

        // Add new shop to the seller's shops array
        seller.shops.push(shopData);

        // Save the updated seller document to the database
        await seller.save();

        return res.status(200).json({
            message: "Successfully added the shop data",
            seller, // Optionally include the updated seller data in the response
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error in adding shop data",
            error: error.message || error,
        });
    }
};
