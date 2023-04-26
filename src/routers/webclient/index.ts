import { default as session } from "./session.routers";
import { default as user } from "./user.routers";
import { Router } from "express";

const router = Router();

router.use("/session", session);
router.use("/user", user);

export default router;
