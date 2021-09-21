import express from "express"
import auth from "../middleware/auth.js"
import { getChats, createChat, updateChat, leaveChat } from "../controllers/chats.js"

const router = express.Router()

router.get("/:id", auth, getChats)
router.post("/", auth, createChat)
router.patch("/:id", auth, updateChat)
router.delete("/:id", auth, leaveChat)

export default router