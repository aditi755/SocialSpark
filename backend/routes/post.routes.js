// import express from 'express';
// import { protectRoute } from '../middleware/protectedRoute.js';
// import { createPost, deletePost, likeUnlikePost, commentOnPost } from '../controllers/post.controllers.js';
// const router = express.Router();

// router.post('/create', protectRoute, createPost)
// router.post('/like/:id', protectRoute, likeUnlikePost);
// router.post('/comment/:id', protectRoute, commentOnPost)
// router.delete('/delete', protectRoute, deletePost)

// export default router;

import express from "express";
import { protectRoute } from "../middleware/protectedRoute.js";
import {
	commentOnPost,
	createPost,
	deletePost,
	getAllPosts,
	getFollowingPosts,
	getLikedPosts,
	getUserPosts,
	likeUnlikePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;


