import userModel from "../models/userModel.js"

// add to cart
const addToCart =async (req,res)=>{
    try{
    const {userId,itemId,size} = req.body
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData;
    if(cartData[itemId]){
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    }
    }catch(err){
        console.log(err)
        res.json({success:false,message:'error occured in add to cart api',err})

    }

} 
// update to cart
const updateToCart =async (req,res)=>{
    try{
        const {userId,itemId,size,quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"updated the cart"})

        
    }catch(err){
        console.log(err)
        res.json({success:false,message:'error occured in update to cart api',err})


    }
}

//  getUsercart data
const getUserCart = async(req,res)=>{
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
       
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"user of the cart",cartData})

        
    }catch(err){
        console.log(err)
        res.json({success:false,message:'error occured in update to cart api',err})


    }
}

export {addToCart,updateToCart,getUserCart}