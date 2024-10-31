import {v2 as coludinary} from 'cloudinary'
import productModel from '../models/productModel.js';


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
const images = [image1,image2,image3,image4].filter((item)=>item!==undefined)
let imagesUrl = await Promise.all(
    images.map(async(item)=>{
        let result =  await coludinary.uploader.upload(item.path,{resource_type:'image'});
        return result.secure_url;
    })
)
const productData = {
    name,description,category,price:Number(price),subCategory,bestseller:bestseller==="true"?true:false,
    sizes:JSON.parse(sizes),image:imagesUrl,date:Date.now()
}
const product = new productModel(productData)
await product.save();


        res.json({success:true,message:"product added"})

    } catch (err) {
        res.json({ success: false, message: 'error occured in add product api', err })

    }

}


const listProduct = async (req, res) => {
    try{
        const products = await productModel.find({})
        res.json({success:true,products})

    }catch(err){
        console.log(err);
        res.json({success:false,message:'error in list product',err})

    }

}


const removeProduct = async (req, res) => {
   try{
    await productModel.findByIdAndDelete(req.body.id)
res.json({success:true,message:'product Removed'})
   }catch(err){
    console.log(err);
    res.json({success:false,message:'error in remove product',err})
     
   }
}

const singleProduct = async (req, res) => {
   try{
    const {productId} = req.body
    const product = await productModel.findById(productId)
   res.json({success:true,product})
   }catch(err){
    res.json({success:false,message:'error occurs in single product api',err})

   }
}



export { listProduct, addProduct, removeProduct, singleProduct }