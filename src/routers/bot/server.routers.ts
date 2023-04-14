import { Router } from "express"
import { createServer, readServer, updateServer, deleteServer, checkRequest, checkExistence, checkAvailability } from '../../controllers/server.controller';

const router = Router()

router.route("/:serverId")
    .post(checkAvailability, checkRequest, createServer)
    .get(checkExistence, readServer)
    .patch(checkExistence, checkRequest, updateServer)
    .delete(checkExistence, deleteServer)

export default router