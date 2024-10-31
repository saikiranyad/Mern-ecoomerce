import mongoose from 'mongoose';

const connectdb = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Db Connected")
    })
    await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`)
}

export default connectdb;