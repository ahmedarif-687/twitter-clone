import express from "express"
import { createtweet, deletetweet, likeordislike ,getalltweets,getfollowingtweet} from "../controllers/tweetcontroller.js";
import isauthenticated  from "../config/auth.js"
const router = express.Router()
router.route("/create").post(isauthenticated,createtweet)
router.route("/delete/:id").delete(isauthenticated,deletetweet)
router.route("/like/:id").put(isauthenticated,likeordislike)
router.route("/getalltweet/:id").get(isauthenticated,getalltweets)
router.route("/getfollowingtweet/:id").get(isauthenticated,getfollowingtweet)
export default router;