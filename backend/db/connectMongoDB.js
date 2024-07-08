import mongoose from 'mongoose';

const connectMongoDB = async() => {
    try{
       const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
       })
       console.log("databse connected")
    }catch(error){
    console.error(`error in connecting ${error.message}`)  
    process.exit(1)
    }
}

export default connectMongoDB