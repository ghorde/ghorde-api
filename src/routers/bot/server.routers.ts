import { Router } from "express"
import { checkRequest, checkExistence, checkAvailability, checkAvailabilityRoute, checkExistenceRoute } from '../../controllers/server/server.controller';
import {createServer, readServer, updateServer, deleteServer} from '../../controllers/server/server.crud'

const router = Router()

router.route("/check/:serverId")
    .post(checkAvailabilityRoute)
    .get(checkExistenceRoute)

router.route("/:serverId")
    .post(checkAvailability, checkRequest, createServer)
    .get(checkExistence, readServer)
    .patch(checkExistence, checkRequest, updateServer)
    .delete(checkExistence, deleteServer)

export default router