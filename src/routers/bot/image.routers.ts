import { getRandomImage } from "../../controllers/image/image.controller"
import {Router} from "express"

const router = Router()

router.route("/random")
    .post(getRandomImage)
//     .post(createImageWithPrompt)

// router.route("/user/:userId")
//     .get(getUserImages)

// router.route("/:imageId")
//     .get(getImage)
    

export default router