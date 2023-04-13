import asyncHandler from "express-async-handler"
import {Request, Response} from "express"
import { mainLogger } from '@/main';
import { ServerService } from "@/services";

export const checkServer = asyncHandler(async(req: Request ,res: Response) => {
    const {id} = req.body
    mainLogger.info(`id recieved: ${id}`)
    const dbres = ServerService.select(id)
    mainLogger.info(dbres)
    res.json(dbres)
    return
})

export const registerServer = asyncHandler(async(req: Request ,res: Response) => {
    const {id} = req.body
    mainLogger.info(`id recieved: ${id}`)
    const dbres = ServerService.create(id, {})
    mainLogger.info(dbres)
    res.json(dbres)
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