import express from "express"

const router = express.Router()

import { authUser,registerUser,logOutUser,getUser,updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


router.post("/auth",authUser)
router.post("/",registerUser)
router.post("/logout",logOutUser)

router.route("/profile").get(protect,getUser).put(protect,updateUser)

export default router