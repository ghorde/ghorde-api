import {
  shCheck,
  shGenerate,
  shGet,
  shGetModels,
} from "../../controllers/stablehorde/stablehorde.controller";
// import { getRandomImage, getUserImages } from "../../controllers/image/image.controller"
import { Router } from "express";

const router = Router();

router.route("/generate").post(shGenerate);

router.route("/models").get(shGetModels);

router.route("/check/:id").get(shCheck);

router.route("/get/:id").get(shGet);

export default router;
