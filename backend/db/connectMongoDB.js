import mongoose from 'mongoose';

const connectMongoDB = async() => {
    try{
       const connection = await mongoose.connect(process.env.MONGO_URI)
    }catch(error){
    console.error(`error in connecting ${error.message}`)  
    }
}