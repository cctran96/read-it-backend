import express from "express"
import { getCommunities, createCommunity, getCommunity, updateCommunity, deleteCommunity, joinCommunity } from "../controllers/communities.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", getCommunities)
router.post("/", auth, createCommunity)
router.get("/:id", getCommunity)
router.patch(":/id", auth, updateCommunity)
router.delete("/:id", auth, deleteCommunity)
router.patch("/:id/like", auth, joinCommunity)

export default router;
