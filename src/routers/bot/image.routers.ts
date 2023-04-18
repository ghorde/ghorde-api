import { getRandomImage, getUserImages } from "../../controllers/image/image.controller"
import {Router} from "express"

const router = Router()

router.route("/random")
    .post(getRandomImage)

router.route("/user/:userId")
    .get(getUserImages)
    

export default router