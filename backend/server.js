

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
// app.use(cors({
//   // origin: ["https://twitter-clone-frontend-roan.vercel.app"],
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dtwwibrkc',
  api_key: '817395265893634',
  api_secret: 'sgcmfrXGaeRygCmYTgD1G0bvGyQ'
});

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);  //2 api needed or meta.env set in frontend 
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
