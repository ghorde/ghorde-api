import asyncHandler from "express-async-handler"
import {Request, Response, NextFunction} from "express"
import { mainLogger } from '../main';
import { Server } from "../services";
import ErrorHandler from "../common/error-handler.common";
import { IServerDoc, isServerDoc } from "../services/server.service";

const ServerControllerErrorHandler = new ErrorHandler('Server Controller')

export const checkRequest = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    if (isServerDoc(req.body)) {
        await next()
        return
    }
    res.json(ServerControllerErrorHandler.critical("Recieved request with invalid body."))
    return
})

export const checkExistence = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    if (await Server.service.isThere(req.params.serverId)) {
        await next()
        return
    }
    res.json(ServerControllerErrorHandler.critical("Server does not exist!"))
    return
})

export const checkAvailability = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    if (!(await Server.service.isThere(req.params.serverId))) {
        await next()
        return
    }
    res.json(ServerControllerErrorHandler.critical("Server already exists!"))
    return
})

export const createServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    if (data) {
        const dbres = await Server.service.create(id, data)
        res.json(dbres)
        return
    }
    res.json(ServerControllerErrorHandler.critical("Data not supplied."))
    return
})

export const readServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.read(id)
    res.json(dbres)
    return
})

export const updateServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    if (data as Partial<IServerDoc>) {
        const dbres = await Server.service.update(id, data)
        res.json(dbres)
        return
    }
    res.json(ServerControllerErrorHandler.critical("Data not supplied."))
    return
})

export const deleteServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.delete(id)
    res.json(dbres)
    return
})