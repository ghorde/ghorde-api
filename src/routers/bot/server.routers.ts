import { Router } from "express"
import { setServerPrefix, getServerPrefix } from "../../controllers"

const router = Router()

router.route("/prefix")
    .get(getServerPrefix)
    .post(setServerPrefix)

export default router