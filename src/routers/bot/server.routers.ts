import { Router } from "express"
import { setServerPrefix, getServerPrefix, checkServer } from "../../controllers"
import { registerServer } from '../../controllers/server.controller';

const router = Router()

router.route("/")
    .get(checkServer)
    .post(registerServer)

router.route("/prefix")
    .get(getServerPrefix)
    .post(setServerPrefix)

export default router