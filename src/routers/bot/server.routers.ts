import { Router } from "express"
import { createServer, readServer, updateServer, deleteServer, checkRequest, checkExistence, checkAvailability, checkAvailabilityRoute, checkExistenceRoute } from '../../controllers/server.controller';

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