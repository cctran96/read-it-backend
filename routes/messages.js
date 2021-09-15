import express from "express"
import auth from "../middleware/auth.js"
import { getMessages, createMessage, updateMessage, deleteMessage } from "../controllers/messages.js"

const router = express.Router()

router.get("/", getMessages)

export default router