import asyncHandler from "express-async-handler"
import {Request, Response, NextFunction} from "express"
import { mainLogger } from '@/main';
import { Server } from "@/services";
import ErrorHandler from "@/common/error-handler.common";
import ErrorGeneric from '@/common/error.generic';

const ServerControllerErrorHandler = new ErrorHandler('Server Controller')

export const checkServerExistence = asyncHandler(async(req: Request ,res: Response) => {
    const {id} = req.body
    if (id) {
        // const dbres = await Server.service.advanced(`select * from server where id = ${id}`)
        const dbres = await Server.service.read(id)
        mainLogger.info(`${res}`)
        if (dbres instanceof ErrorGeneric) {
            res.json(ServerControllerErrorHandler.unhandled("Server ID not supplied!"))
        }
        res.json(dbres)
        return
    }
    res.json(ServerControllerErrorHandler.critical("Server ID not supplied!"))
    return 
})

export const checkServer = asyncHandler(async(req: Request ,res: Response, next: NextFunction) => {
    const {id} = req.body
    if (parseInt(id)) {
        return next()
    }
    res.json(ServerControllerErrorHandler.critical("Server ID not supplied!"))
    return 
})

export const registerServer = asyncHandler(async(req: Request ,res: Response) => {
    const {id, prefix} = req.body
    if (prefix) {
        mainLogger.info(`register req recieved for: ${id}`)
        const dbres = Server.service.create(id, {prefix: '!'})
        mainLogger.info(dbres)
        res.json(dbres)
        return
    }
    res.json(ServerControllerErrorHandler.critical("Prefix not supplied!"))
    return
})

export const setServerPrefix = asyncHandler(async(req: Request ,res: Response) => {
    mainLogger.info("setServerPrefix Hit!")
    res.json({})
    return
})

export const getServerPrefix = asyncHandler(async(req: Request ,res: Response) => {
    const {id} = req.body
    const dbres = await Server.service.read(id)
    res.json(dbres)
    return
})