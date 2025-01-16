import jwt from 'jsonwebtoken'
import Customer from '../model/customerModel.js';
import Seller from '../model/sellerModel.js';

export const protectedCustomer = async (req, res, next) => {
    try {
        console.log(req.cookies);
        const refresh_token = req.cookies.refreshTokenCustomer;
        if (!refresh_token) {
            return res.status(403).json({
                message: "No reffresh token provided",
            });
        }

        const decode = jwt.verify(refresh_token, process.env.refreshKeyCustomer);
        // console.log(decode);
        const customer = await Customer.findById(decode.customerId).select("-password");

        if (!customer) {
            return res.status(403).json({
                message: "Invalid Refresh Token",
            });
        }

        req.customer = customer
        // console.log(customer);
        next();
    } catch (error) {
        res.status(500).json({
            message: "Error in Validation Customer through middleware",
            error: error.message || error
        })
    }
}

export const protectedSeller = async (req, res, next) => {
    // console.log(res);
    // console.log("res is consoled")
    try {
        // console.log("hello");
        // console.log(res);
        // console.log(req);
        // console.log(req.cookies);

        const refresh_token_seller = req?.cookies.refreshTokenSeller;
        // console.log(refresh_token_seller);
        if (!refresh_token_seller) {
            return res.status(403).json({
                message: "No refresh token provided",
            });
        }


        const decode = jwt.verify(refresh_token_seller, process.env.refreshKeySeller);
        // console.log(decode)
        // console.log("decode is consoled");

        const seller = await Seller.findById(decode?.sellerId).select("-password");

        if (!seller) {
            return res.status(403).json({
                message: "Invalid Access Token",
            });
        }

        req.seller = seller
        next();
    } catch (error) {
        res.status(500).json({
            message: "Error in Validation Seller through middleware",
            error: error.message || error
        })
    }
}

