import {Router} from "express";

const router = Router();

router.route("/login/:code")
  .get(handleCodeLogin);


export default router;