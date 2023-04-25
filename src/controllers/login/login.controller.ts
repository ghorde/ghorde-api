import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Authlink } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";

const AuthlinkCrudErrorHandler = new ErrorHandler("Authlink Crud");
const AuthlinkCrudSuccessHandler = new SuccessHandler("Authlink Crud");

export const issueToken = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    res.json(AuthlinkCrudErrorHandler.badRequest("Missing code"));
    return;
  }
  const { access_token, expires_in, refresh_token } =
    await Authlink.exchangeInitialToken(code);
  res.json(
    AuthlinkCrudSuccessHandler.ok({
      access_token,
      expires_in,
      refresh_token,
      issue_time: Date.now(),
    })
  );
  return;
});

export const revokeToken = asyncHandler(async (req: Request, res: Response) => {
  const { access_token } = req.body;
  if (!access_token) {
    res.json(AuthlinkCrudErrorHandler.badRequest("Missing code"));
    return;
  }
  await Authlink.revokeToken(access_token);
  res.json(AuthlinkCrudSuccessHandler.ok({}));
  return;
});
