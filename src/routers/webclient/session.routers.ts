import {
  checkToken,
  issueToken,
  refreshToken,
  revokeToken,
} from "../../controllers/webclient/session.controller";
import { Router } from "express";

const router = Router();

router.route("/token").post(issueToken).patch(refreshToken);
router.route("/revoke").post(revokeToken);
router.route("/check").post(checkToken);


export default router;
