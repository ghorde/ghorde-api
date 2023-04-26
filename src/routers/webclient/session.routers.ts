import {
  issueToken,
  refreshToken,
  revokeToken,
} from "../../controllers/login/login.controller";
import { Router } from "express";

const router = Router();

router.route("/token")
  .post(issueToken)
  .delete(revokeToken)
  .patch(refreshToken);

export default router;
