import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbconnection from './config/dbconnection.js';
import productRoutes from './routes/productroutes.js';
import customerRouter from './routes/customerRoutes.js';
import shopRouter from './routes/ShopRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';
import cartRouter from './routes/cartRoutes.js';




dotenv.config();



const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());

app.use("/api", customerRouter);
app.use("/product", productRoutes);
app.use("/shop", shopRouter);
app.use("/seller", sellerRouter);
app.use('/cart', cartRouter);

const port = process.env.PORT || 5000
dbconnection();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
