import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Cardboard } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";

const UserControllerErrorHandler = new ErrorHandler("User Controller");
const UserControllerSuccessHandler = new SuccessHandler("User Controller");

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  console.log(code)
  if (!code) {
    res.json(UserControllerErrorHandler.badRequest("Missing code."));
    return;
  }
  const user = await Cardboard.getUserInfo(code);
  res.json(UserControllerSuccessHandler.ok(user));
  return;
});
