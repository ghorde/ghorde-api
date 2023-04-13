const {default: Surreal} = require('surrealdb.js')

import pino from "pino"
import Express from "express"
import * as dotenv from 'dotenv'
import { connectDb } from "./helpers/connect-db"
import { configureLogger } from "./helpers/configure-logger"

dotenv.config()
const logger = configureLogger(pino)

export const { SURREAL_LOC, SURREAL_USER, SURREAL_PASS } = process.env

export const db = connectDb(new Surreal(SURREAL_LOC), SURREAL_USER, SURREAL_PASS)

const app = Express()

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});