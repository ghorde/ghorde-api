import Surreal from'surrealdb.js'

import pino from "pino"
import Express from "express"
import * as dotenv from 'dotenv'
import { configureDb, configureLogger, instanceServices } from "./helpers"
import { LevelWithSilent } from 'pino';
import router from './routers'

dotenv.config()
export const mainLogger = configureLogger(pino, 'main', (process.env.LOGGER_LEVEL).toLowerCase() as LevelWithSilent)

export const { SURREAL_LOC, SURREAL_USER, SURREAL_PASS } = process.env

export const db = await configureDb(new Surreal(SURREAL_LOC), SURREAL_USER, SURREAL_PASS) // instance db

const Services = instanceServices(db, ['servers'])

const app = Express()
app.use(Express.json())

app.use(router)

app.get("/", (req, res) => {
    mainLogger.info("route was hit!")
    res.send("Hello World!");
});
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});