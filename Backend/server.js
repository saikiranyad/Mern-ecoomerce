import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = process.env.PORT || 4000;
connectdb();
connectCloudinary();
app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.json("Api work")
})

app.listen(port,()=>console.log('Server is running in port :'+port))