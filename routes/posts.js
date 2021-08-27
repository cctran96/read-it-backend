import express from "express"
import { getPosts, createPost, getPost, updatePost, deletePost, likePost } from "../controllers/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/", auth, createPost)
router.get("/:id", getPost)
router.patch(":/id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/:id/like", auth, likePost)

export default router