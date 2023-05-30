import {
  getUser,
} from "../../controllers/webclient";
import { Router } from "express";

const router = Router();

router.route("/info").post(getUser);

export default router;
