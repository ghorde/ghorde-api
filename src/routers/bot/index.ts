import { default as server } from "./server.routers";
import { default as image } from "./image.routers";
import { default as stableHorde } from "./stablehorde.routers";
import { Router } from "express";

const router = Router();

router.use("/server", server);
router.use("/image", image);
router.use("/sh", stableHorde);

export default router;
