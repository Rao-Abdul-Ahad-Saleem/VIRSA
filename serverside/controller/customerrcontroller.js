import Customer from "../model/customerModel.js";
import { redis } from "../middleware/redis.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Seller from "../model/sellerModel.js";


const generateTokensCustomer = async (customerId) => {
    const accessTokenCustomer = jwt.sign({ customerId }, process.env.accessKeyCustomer, { expiresIn: '15m' });  //  { expiresIn: '60' }, 1 = 1 sec 
    const refreshTokenCustomer = jwt.sign({ customerId }, process.env.refreshKeyCustomer, { expiresIn: '7d' }); //  { expiresIn: '30' }
    return { accessTokenCustomer, refreshTokenCustomer }
}

const setCustomerCookies = async (res, accessTokenCustomer, refreshTokenCustomer) => {
    res.cookie("accessTokenCustomer", accessTokenCustomer, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000

        // maxAge: 60 * 1000
    });
    res.cookie("refreshTokenCustomer", refreshTokenCustomer, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
        // maxAge: 30 * 1000
    });
}

const storeCustomerToken = async (customerId, refreshTokenCustomer) => {
    try {
        await redis.set(`refresh_token ${customerId}`, refreshTokenCustomer, 'EX', 7 * 24 * 60 * 60 * 1000);
    } catch (error) {
        console.error('Error storing token in Redis:', error);
        throw error; // Optionally, re-throw the error or handle it as needed
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check if the customer already exists
        const customerExist = await Customer.findOne({ email });
        if (customerExist) {
            return res.status(400).json({
                message: 'User Already Exists',
                customerExist
            });
        }

        const sellerExist = await Seller.findOne({ email });
        if (sellerExist) {
            return res.status(400).json({
                message: "This email already exist.You should have a unique email. So try another one!",
                sellerExist
            })
        }

        // Hash the password
        const hashedpassword = await bcrypt.hash(password, 10);

        // Create the customer
        const customer = await Customer.create({
            name,
            email,
            password: hashedpassword,
            phone,
            address
        });

        // Generate tokens
        const { accessTokenCustomer, refreshTokenCustomer } = await generateTokensCustomer(customer._id);

        const isCustomer = Customer.findById(customer._id);

        if (isCustomer) {
            // Set cookies
            await setCustomerCookies(res, accessTokenCustomer, refreshTokenCustomer);
            // console.log("here")

            // Store the refresh token
            await storeCustomerToken(customer._id, refreshTokenCustomer);
        }



        // Success response
        return res.status(200).json({
            message: "User registered Successfully",
            customer
        });
    } catch (error) {
        // console.error('Error during registration:', error); // Log the error
        return res.status(500).json({
            message: 'Error in registering user',
            error: error.message || error // Send error details for debugging
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const customer = await Customer.findOne({ email })
        if (!customer) {
            return res.status(400).json({
                message: "Buyer with these credentials does Not Exists",
            })
        }


        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Please provide Valid Credentials"
            })
        }


        const { accessTokenCustomer, refreshTokenCustomer } = await generateTokensCustomer(customer._id);
        await setCustomerCookies(res, accessTokenCustomer, refreshTokenCustomer);
        await storeCustomerToken(customer._id, refreshTokenCustomer);

        return res.status(200).json({
            message: "Customer loged In Succcessfully",
            customer,
            accessTokenCustomer,
            refreshTokenCustomer

        })
    } catch (error) {
        return res.status(401).json({
            message: "Error in logging in User",
            error
        })
    }


}

// this funtion is to get the profile of user after the middleware protected layer 
export const getProfie = async (req, res) => {
    try {
        // this req.user comes from the middleware which i don't define here but it is defined in mern project or mern
        const customer = req.customer;
        return res.status(200).json({
            message: "Successfully get the customer profile",
            customer
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error in authenticating customer",
            error: error.message
        })
    }
}



export const logout = async (req, res) => {
    try {

        console.log(req.cookies)
        const refresh_token = req.cookies.refreshTokenCustomer;

        if (!refresh_token) {
            return res.status(401).json({ message: 'No refresh token found' });
        }

        let decode;
        try {
            decode = jwt.verify(refresh_token, process.env.refreshKeyCustomer);
        } catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token', error: err.message });
        }

        // Ensure Redis key matches your token storage strategy
        const redisKey = `refresh_token ${decode.customerId}`;
        await redis.del(redisKey);

        // Clear cookies
        res.clearCookie("accessTokenCustomer", { httpOnly: true });
        res.clearCookie("refreshTokenCustomer", { httpOnly: true });

        return res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        // console.error('Logout error:', error);
        return res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};


export const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteuser = await Customer.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'User Deleted successfully',
            deleteuser
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error indeleting User',
            error
        })
    }
}