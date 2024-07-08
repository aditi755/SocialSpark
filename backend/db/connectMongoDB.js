import mongoose from 'mongoose';

const connectMongoDB = async() => {
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
       const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
       })
       console.log("databse connected")
       console.log('MongoDB URI:', process.env.MONGO_URI);

    }catch(error){
    console.error(`error in connecting ${error.message}`)  
    process.exit(1)
    }
}

export default connectMongoDB