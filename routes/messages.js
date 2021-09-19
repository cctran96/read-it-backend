import express from "express"
import auth from "../middleware/auth.js"
import { createMessage, deleteMessage, getMessages } from "../controllers/messages.js"

const router = express.Router()

router.get("/:id", auth, getMessages)
router.post("/", auth, createMessage)
router.delete("/:id", auth, deleteMessage)

export default router