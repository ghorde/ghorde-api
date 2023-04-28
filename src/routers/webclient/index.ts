import { shGetModels } from "../../controllers/stablehorde/stablehorde.controller";
import { default as session } from "./session.routers";
import { default as user } from "./user.routers";
import { Router } from "express";

const router = Router();

router.use("/session", session);
router.use("/user", user);
router.route("/models").get(shGetModels);

export default router;
