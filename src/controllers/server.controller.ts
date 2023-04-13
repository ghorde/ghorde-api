import asyncHandler from "express-async-handler"
import {Request, Response} from "express"
import { mainLogger } from '../main';

export const checkServer = asyncHandler(async(req: Request ,res: Response) => {
    mainLogger.info("checkServer Hit!")
    res.json({})
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