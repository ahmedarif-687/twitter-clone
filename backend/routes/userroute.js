import express from "express"
import { Register ,Login, logout, getmyprofile, getOthersUsers,follow,unfollow} from "../controllers/usercontroller.js"
import isauthenticated  from "../config/auth.js"
import { bookmark } from "../controllers/usercontroller.js"
const router = express.Router()
router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(logout)
router.route("/bookmark/:id").put(isauthenticated,bookmark)
router.route("/profile/:id").get(isauthenticated,getmyprofile)
router.route("/otherusers/:id").get(isauthenticated,getOthersUsers)
router.route("/follow/:id").post(isauthenticated,follow)
router.route("/unfollow/:id").post(isauthenticated,unfollow)

export default router;