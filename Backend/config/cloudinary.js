import {v2 as cloudinary} from 'cloudinary'
const connectCloudinary = async()=>{

    cloudinary.config({
        cloud_name:process.env.CLOUDINARYNAME,
        api_key:process.env.CLOUDINARYAPI,
        api_secret:process.env.CLOUDINARYSECRET
    })


}

export default connectCloudinary;