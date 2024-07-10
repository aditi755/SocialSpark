// import express from "express"
// import dotenv from 'dotenv'
// import authRoutes from "./routes/auth.routes.js"
// import userRoutes from './routes/user.routes.js'
// import postRoutes from "./routes/post.routes.js"
// import notificationRoutes from './routes/notification.route.js'
// import connectMongoDB from "./db/connectMongoDB.js";
// import cookieParser from "cookie-parser"
// import { v2 as cloudinary } from "cloudinary"
// import path from "path"
// import cors from 'cors';

// dotenv.config()
// app.use(cors,({
//     origin: ["https://twitter-clone-frontend-roan.vercel.app/"],
//     methods: ["POST", "GET", "POST", "PUT"],
//     credentials: true
// }))

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY ,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// const app = express()
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// app.use(express.json({limit: "5mb"})) //to parse req.body middleware function that runs everytime at req and res dos attack
// app.use(express.urlencoded({ extended: true}))
// app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Hello World');
//   });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/notifications", notificationRoutes);


// // if (process.env.NODE_ENV === "production") {
// // 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // 	app.get("*", (req, res) => {
// // 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// // 	});
// // }

// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`)
//      connectMongoDB()
    
// })


import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// Import your routes and MongoDB connection function
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js';
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from './routes/notification.route.js';
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
  origin: ["https://twitter-clone-frontend-roan.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
