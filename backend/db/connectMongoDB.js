import mongoose from 'mongoose';

const connectMongoDB = async() => {
    const MongodbUrl ="mongodb+srv://awdhesh1700:CAI3kJPN14hcXxFO@cluster0.q5sfvtu.mongodb.net/twitter-db?retryWrites=true&w=majority&appName=Cluster0"
    try{
        if (!MongodbUrl) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
       const connection = await mongoose.connect(MongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
       })
       console.log("databse connected")
       console.log('MongoDB URI:', MongodbUrl);

    }catch(error){
    console.error(`error in connecting ${error.message}`)  
    process.exit(1)
    }
}

export default connectMongoDB