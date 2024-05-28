import express from 'express'
import { protectRoute } from '../middleware/protectedRoute.js'
import { getUserProfile, followUnfollowedUser, updateUserProfile, getSuggestedUsers } from '../controllers/user.controller.js';
const router = express.Router();

router.get("/profile/:userName", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers );
router.post("/follow/:id", protectRoute, followUnfollowedUser);
router.post("/update", protectRoute, updateUserProfile);

export default router;
