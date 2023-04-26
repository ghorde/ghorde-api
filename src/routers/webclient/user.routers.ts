import {
  getUser,
  getUserGuilds,
  getUserInGuild,
} from "../../controllers/webclient";
import { Router } from "express";

const router = Router();

router.route("/info").post(getUser);

router.route("/guilds").post(getUserGuilds);

router.route("/guild").post(getUserInGuild);

export default router;
