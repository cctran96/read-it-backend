import express from "express"
import auth from "../middleware/auth.js"
import { getChats, createChat, updateChat, deleteChat } from "../controllers/chats.js"

const router = express.Router()

router.get("/", getChats)

export default router