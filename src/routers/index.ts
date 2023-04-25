import { Router } from "express";

import { default as bot } from "./bot";
import { default as webclient } from "./webclient";

const router = Router();

router.use("/bot", bot);
router.use("/webclient", webclient);

export default router;
