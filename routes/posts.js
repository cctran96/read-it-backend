import express from "express"
import auth from "../middleware/auth.js"
import { 
    getPosts, 
    createPost, 
    getPost, 
    updatePost, 
    deletePost, 
    likePost, 
    getUserPosts 
} from "../controllers/posts.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/", auth, createPost)
router.get("/:id", getPost)
router.patch(":/id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch("/:id/like", auth, likePost)
router.get("/user/:id", getUserPosts)

export default router