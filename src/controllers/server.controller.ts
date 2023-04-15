import asyncHandler from "express-async-handler"
import {Request, Response, NextFunction} from "express"
import { Server } from "../services";
import ErrorHandler from "../common/error-handler.common";
import { isServerDoc } from "../services/server.service";
import SuccessHandler from "../common/success-handler.common";

const ServerControllerErrorHandler = new ErrorHandler('Server Controller')
const ServerControllerSuccessHandler = new SuccessHandler('Server Controller')

export const checkRequest = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    if (isServerDoc(req.body)) {
        await next()
        return
    }
    res.json(ServerControllerErrorHandler.badRequest("Recieved request with invalid body."))
    return
})

export const checkExistence = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    if (await Server.service.isThere(req.params.serverId)) {
        await next()
        return
    }
    res.json(ServerControllerErrorHandler.notFound("Server does not exist!"))
    return
})

export const checkAvailability = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    if (!(await Server.service.isThere(req.params.serverId))) {
        await next()
        return
    }
    res.json(ServerControllerErrorHandler.conflict("Server already exists!"))
    return
})

export const createServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    const dbres = await Server.service.create(id, data)
    res.json(ServerControllerSuccessHandler.created(dbres))
    return
})

export const readServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.read(id)
    res.json(ServerControllerSuccessHandler.ok(dbres))
    return
})

export const updateServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    const dbres = await Server.service.update(id, data)
    res.json(ServerControllerSuccessHandler.accepted(dbres))
    return
})

export const deleteServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.delete(id)
    res.json(ServerControllerSuccessHandler.noContent(dbres))
    return
})