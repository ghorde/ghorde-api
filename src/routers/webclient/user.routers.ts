
import { getUser, getUserGuilds, getUserInGuild } from "../../controllers/webclient";
import { Router } from "express";

const router = Router();

router.route("/userInfo")
  .post(getUser)

router.route("/userGuilds")
  .post(getUserGuilds)

router.route("/userInGuild")
  .post(getUserInGuild)

export default router;
