import { default as session } from "./session.routers";
import { Router } from "express";

const router = Router();

router.use("/session", session);

export default router;
