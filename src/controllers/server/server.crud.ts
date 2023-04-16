import asyncHandler from "express-async-handler"
import {Request, Response } from "express"
import { Server } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { isError } from "../../common/error.generic";

const ServerCrudErrorHandler = new ErrorHandler('Server Crud')
const ServerCrudSuccessHandler = new SuccessHandler('Server Crud')

export const createServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    const dbres = await Server.service.create(data, id)
    if (isError(dbres)) {
        res.json(ServerCrudErrorHandler.internal(dbres.errMsg))
        return
    }
    res.json(ServerCrudSuccessHandler.created(dbres))
    return
})

export const readServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.read(id)
    if (isError(dbres)) {
        res.json(ServerCrudErrorHandler.internal(dbres.errMsg))
        return
    }
    res.json(ServerCrudSuccessHandler.ok(dbres))
    return
})

export const updateServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    const dbres = await Server.service.update(id, data)
    if (isError(dbres)) {
        res.json(ServerCrudErrorHandler.internal(dbres.errMsg))
        return
    }
    res.json(ServerCrudSuccessHandler.accepted(dbres))
    return
})

export const deleteServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.delete(id)
    if (isError(dbres)) {
        res.json(ServerCrudErrorHandler.internal(dbres.errMsg))
        return
    }
    res.json(ServerCrudSuccessHandler.noContent(dbres))
    return
})