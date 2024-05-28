import express from "express"
const router = express.Router();
import { signup, login, logout, getMe } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectedRoute.js";

router.get("/me", protectRoute, getMe)//protected route
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router;