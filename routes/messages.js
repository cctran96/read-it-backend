import express from "express"
import auth from "../middleware/auth.js"
import { createMessage, deleteMessage } from "../controllers/messages.js"

const router = express.Router()

router.post("/", auth, createMessage)
router.delete("/:id", auth, deleteMessage)

export default router