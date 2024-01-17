import express from "express"
import { generateStoryController, getFeedStories, getLeaderBoard, getUserStories, upvoteStory } from "../controllers/storyController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/generatestory",generateStoryController)
router.get("/getuserstories",protect,getUserStories)
router.get("/feed",getFeedStories)
router.get("/leaderboard",getLeaderBoard)
router.post("/upvotestory",protect,upvoteStory)





export default router
