import asyncHandler from "express-async-handler"
import {Request, Response } from "express"
import { Server } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";

const ServerCrudErrorHandler = new ErrorHandler('Server Crud')
const ServerCrudSuccessHandler = new SuccessHandler('Server Crud')

export const createServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    const dbres = await Server.service.create(id, data)
    res.json(ServerCrudSuccessHandler.created(dbres))
    return
})

export const readServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.read(id)
    res.json(ServerCrudSuccessHandler.ok(dbres))
    return
})

export const updateServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const data = req.body
    const dbres = await Server.service.update(id, data)
    res.json(ServerCrudSuccessHandler.accepted(dbres))
    return
})

export const deleteServer = asyncHandler(async(req: Request ,res: Response) => {
    const id = req.params.serverId
    const dbres = await Server.service.delete(id)
    res.json(ServerCrudSuccessHandler.noContent(dbres))
    return
})