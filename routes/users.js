import express from "express"
import { rememberedLogin, signin, signup, getUsers } from "../controllers/users.js"

const router = express.Router()

router.get("/signin", rememberedLogin)
router.post("/signin", signin)
router.get("/", getUsers)
router.post("/", signup)

export default router