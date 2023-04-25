import {
  issueToken,
  revokeToken,
} from "../../controllers/login/login.controller";
import { Router } from "express";

const router = Router();

router.route("/issueToken").post(issueToken);

router.route("/revokeToken").post(revokeToken);

export default router;
