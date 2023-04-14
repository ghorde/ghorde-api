import { Router } from "express"
import { setServerPrefix, getServerPrefix, checkServer, registerServer, checkServerExistence } from "../../controllers"

const router = Router()

router.route("/")
    .get(checkServerExistence)
    .post(checkServer, registerServer)

router.route("/prefix")
    .get(checkServer, getServerPrefix)
    .post(checkServer, setServerPrefix)

export default router