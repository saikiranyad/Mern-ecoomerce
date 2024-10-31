import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import { allOrders, placeorder, placeorderrazorpay, placeorderStripe, updateStatus, userOrders, veridyStripe } from '../controllers/orderController.js';




const orderRouter = express.Router();


// Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authUser,placeorder);
orderRouter.post('/stripe',authUser,placeorderStripe)
orderRouter.post('/razorpay',authUser,placeorderrazorpay)

// verify features

// user features
orderRouter.post('/userorders',authUser,userOrders);
orderRouter.post('/verifyStripe',authUser,veridyStripe)

export default orderRouter