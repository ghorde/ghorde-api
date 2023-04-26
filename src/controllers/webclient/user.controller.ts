import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Authlink } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { mainLogger } from "../../main";

const UserControllerErrorHandler = new ErrorHandler("User Controller");
const UserControllerSuccessHandler = new SuccessHandler("User Controller");

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    res.json(UserControllerErrorHandler.badRequest("Missing code."));
    return;
  }
  const user =
    await Authlink.getUserInfo(code);
  res.json(
    UserControllerSuccessHandler.ok(user)
  );
  return;
});

export const getUserGuilds = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    res.json(UserControllerErrorHandler.badRequest("Missing code."));
    return;
  }
  const user =
    await Authlink.getGuilds(code);
  res.json(
    UserControllerSuccessHandler.ok(user)
  );
  return;
});

export const getUserInGuild = asyncHandler(async (req: Request, res: Response) => {
  const { code, guildId } = req.body;
  if (!(code && guildId)) {
    res.json(UserControllerErrorHandler.badRequest("Missing code."));
    return;
  }
  const user =
    await Authlink.getUserInGuild(code, guildId);
  res.json(
    UserControllerSuccessHandler.ok(user)
  );
  return;
});