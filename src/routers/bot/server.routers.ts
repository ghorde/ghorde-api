import { Router } from "express"
import { setServerPrefix, getServerPrefix, checkServer } from "../../controllers"
import { registerServer } from '../../controllers/server.controller';

const router = Router()

router.route("/")
    .post(checkServer, registerServer)

router.route("/prefix")
    .get(checkServer, getServerPrefix)
    .post(checkServer, setServerPrefix)

export default router