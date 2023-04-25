import Surreal from "surrealdb.js";

import pino from "pino";
import Express from "express";
import * as dotenv from "dotenv";
import { configureDb, configureLogger } from "./helpers";
import { LevelWithSilent } from "pino";
import router from "./routers";
import https from 'https'
import fs from 'fs'
import { httpser } from "./middleware/httpser.middleware";
import path from "path";
import { pem_passphrase } from "./config";

const options = {
  key: fs.readFileSync(path.resolve('key.pem')),
  cert: fs.readFileSync(path.resolve('cert.pem')),
  passphrase: pem_passphrase
}

dotenv.config();
export const mainLogger = configureLogger(
  pino,
  "main",
  process.env.LOGGER_LEVEL.toLowerCase() as LevelWithSilent
);
export const errLogger = configureLogger(
  pino,
  "err",
  process.env.LOGGER_LEVEL.toLowerCase() as LevelWithSilent
);
export const serviceLogger = configureLogger(
  pino,
  "service",
  process.env.LOGGER_LEVEL.toLowerCase() as LevelWithSilent
);

export const { SURREAL_LOC, SURREAL_USER, SURREAL_PASS } = process.env;
export const db = new Surreal(SURREAL_LOC);
configureDb(db, SURREAL_USER, SURREAL_PASS); // instance db

const app = Express();
app.use(Express.json());
// app.use(httpser) not necessary rn
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

https.createServer(options, app).listen(443);