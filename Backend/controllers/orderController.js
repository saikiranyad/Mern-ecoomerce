import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
// placing orders using cod method
const currency = 'inr'
const deliveryCharges = 10


const stripe = new Stripe(process.env.STRIPEKEY)

const placeorder = async(req,res)=>{
    try{
        const {userId,items,amount,address} = req.body
        const orderData = {
            userId,
           
            items,
            address,
            amount,
            paymentMethod :'COD',
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:'order placed'})


    }catch(err){
        console.log(err);
        res.json({success:false,message:'error occured in place order api ',err})
    }

}

// placing orders using stripe

const placeorderStripe = async(req,res)=>{
    try{
        const {userId,items,amount,address} = req.body
    const {origin} = req.headers;

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod :'Stripe',
        payment:false,
        date:Date.now()
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()
    const line_items = items.map((item)=>(
        {
            price_data:{
                currency:currency,
                product_data :{
                    name:item.name
                },unit_amount:item.price *100
            },
            quantity:item.quantity

        }
    ))

    line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges'
            },
            unit_amount:deliveryCharges *100
        },
        quantity :1
    })
    const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment',
    })
    res.json({success:true,session_url:session.url})



    }catch(err){
        console.log(err);
        res.json({success:false,message:'error occured in stripe api',err})

    }
 
    
}
const veridyStripe = async(req,res)=>{
   const {orderId,success,userId} = req.body
   try{
    if(success ==='true'){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true})
    }else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({success:false})
    }

   }catch(err){
    console.log(err)
    res.json({success:false,message:err.message})
   }
}

// placing orders using razorpay
const placeorderrazorpay = async(req,res)=>{

}

// all orders data for admin panel

const allOrders = async(req,res)=>{
    try{
        const orders= await orderModel.find({})
        res.json({success:true,orders})

    }catch(err){
        console.log(err)
        res.json({success:false,message:'error occurs in all orders in admin panel',err})

    }

}

// user orders data for frontend

const userOrders = async(req,res)=>{
    try{
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    }catch(err){
         console.log(err)
         res.json({success:false,message:'error in user order in frontend api',err})

    }
   
}

// updateStatus for admin panel

const updateStatus  = async(req,res)=>{
    try{
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status updated'})
    }   catch(err){
        console.log(err)
        res.json({success:false,message:'error occured in update status api in admin panel',err})

    } 
}


export {allOrders,placeorder,veridyStripe,placeorderStripe,placeorderrazorpay,userOrders,updateStatus}