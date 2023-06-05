import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Cardboard, User } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { isError } from "../../common/error.generic";

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

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.json(UserControllerErrorHandler.badRequest("Missing token."));
    return;
  }
  const userData = await Cardboard.getUserInfo(token);
  if (!userData.id) {
    res.json(UserControllerErrorHandler.badRequest("Invalid token."));
    return;
  }
  const dbres = await User.service.create({hordeToken: undefined, negativePrompt: [
    "nsfw", "lowres", "bad anatomy", "bad hands", "text", "error", "missing fingers", "extra digit", "fewer digits", "cropped", "worst quality", "low quality", "normal quality", "jpeg artifacts", "signature", "watermark", "username", "blurry"
  ]}, userData.id)
  if (isError(dbres)) {
    res.json(UserControllerErrorHandler.internal(dbres.errMsg));
    return;
  }
  res.json(UserControllerSuccessHandler.created(dbres));
  return;
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { token, hordeToken, negativePrompt } = req.body;
  if (!token) {
    res.json(UserControllerErrorHandler.badRequest("Missing token."));
    return;
  }
  const userData = await Cardboard.getUserInfo(token);
  if (!userData.id) {
    res.json(UserControllerErrorHandler.badRequest("Invalid token."));
    return;
  }
  const dbres = await User.service.update(userData.id, {hordeToken, negativePrompt})
  if (isError(dbres)) {
    res.json(UserControllerErrorHandler.internal(dbres.errMsg));
    return;
  }
  res.json(UserControllerSuccessHandler.accepted(dbres));
  return;
});

export const getHordeUser = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.json(UserControllerErrorHandler.badRequest("Missing token."));
    return;
  }
  const userData = await Cardboard.getUserInfo(token);
  if (!userData.id) {
    res.json(UserControllerErrorHandler.badRequest("Invalid token."));
    return;
  }
  const dbres = await User.service.read(userData.id)
  if (isError(dbres)) {
    res.json(UserControllerErrorHandler.internal(dbres.errMsg));
    return;
  }
  res.json(UserControllerSuccessHandler.ok(dbres));
  return;
});