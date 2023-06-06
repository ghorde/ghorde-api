import {
  createUser,
  getHordeUser,
  getUser,
  updateUser,
} from "../../controllers/webclient";
import { Router } from "express";

const router = Router();

router.route("/info").post(getUser);

router.route("/horde").post(createUser)
router.route("/hordeUser").post(getHordeUser)
router.route("/hordeUserUpdate").post(updateUser)
export default router;
