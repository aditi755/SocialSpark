import express from "express"
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes.js"
import userRoutes from './routes/user.routes.js'
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from './routes/notification.route.js'
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary"
import path from "path"
// import { fileURLToPath } from 'url';
dotenv.config()

// // Get the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // Load environment variables from .env file in the root directory
// dotenv.config({ path: path.resolve(__dirname, '../.env') });


// Mongo_URI=mongodb+srv://awdhesh1700:CAI3kJPN14hcXxFO@cluster0.q5sfvtu.mongodb.net/twitter-db?retryWrites=true&w=majority&appName=Cluster0
// PORT=5000
// JWT_SECRET=iA8JrWwIn3bKVo5dsDGBtDGWsoN67YXN/VDwum6p+mI= 
// NODE_ENV=development
// CLOUDINARY_CLOUD_NAME=dtwwibrkc
// CLOUDINARY_API_KEY=817395265893634
// CLOUDINARY_API_SECRET=sgcmfrXGaeRygCmYTgD1G0bvGyQ
//console.log('MongoDB URI:',mongodb+srv://awdhesh1700:CAI3kJPN14hcXxFO@cluster0.q5sfvtu.mongodb.net/twitter-db?retryWrites=true&w=majority&appName=Cluster0);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({limit: "5mb"})) //to parse req.body middleware function that runs everytime at req and res dos attack
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);


// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
     connectMongoDB()
    
})