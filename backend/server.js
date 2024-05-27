import express from "express"
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_URi);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})