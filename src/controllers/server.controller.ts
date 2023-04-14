import asyncHandler from "express-async-handler"
import {Request, Response, NextFunction} from "express"
import { mainLogger } from '@/main';
import { Server } from "@/services";
import ErrorHandler from "@/common/error-handler.common";

const ServerControllerErrorHandler = new ErrorHandler('Server Controller')

export const checkServer = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    const {id} = req.body
    if (id) {
        return next()
    }
    res.json(ServerControllerErrorHandler.critical("Server ID not supplied!"))
    return 
})

export const registerServer = asyncHandler(async(req: Request ,res: Response) => {
    const {id} = req.body
    if (id) {
        mainLogger.info(`id recieved: ${id}`)
        const dbres = Server.service.create(id, {prefix: '!'})
        mainLogger.info(dbres)
        res.json(dbres)
        return
    }
    return
})

export const setServerPrefix = asyncHandler(async(req: Request ,res: Response) => {
    mainLogger.info("setServerPrefix Hit!")
    res.json({})
    return
})

export const getServerPrefix = asyncHandler(async(req: Request ,res: Response) => {
    mainLogger.info("getServerPrefix Hit!")
    res.json({})
    return
})