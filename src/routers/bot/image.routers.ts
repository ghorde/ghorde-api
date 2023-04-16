import { getRandomImage, getUserImages } from "../../controllers/image/image.controller"
import {Router} from "express"

const router = Router()

router.route("/random")
    .post(getRandomImage)

router.route("/user/:userId")
    .get(getUserImages)
// router.route("/prompt/:promptId")
//     .post(createImageWithPrompt)

// router.route("/user/:userId")
//     .get(getUserImages)

// router.route("/:imageId")
//     .get(getImage)
    

export default router