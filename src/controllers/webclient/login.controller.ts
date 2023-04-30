import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Authlink } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { mainLogger } from "../../main";

const AuthlinkCrudErrorHandler = new ErrorHandler("Authlink Crud");
const AuthlinkCrudSuccessHandler = new SuccessHandler("Authlink Crud");

export const issueToken = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    res.json(AuthlinkCrudErrorHandler.badRequest("Missing code."));
    return;
  }
  const { access_token, expires_in, refresh_token } =
    await Authlink.exchangeInitialToken(code);
  res.json(
    AuthlinkCrudSuccessHandler.created({
      access_token,
      expires_in,
      refresh_token,
      issue_time: Math.floor(Date.now() / 1000),
    })
  );
  return;
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { code } = req.body;
    if (!code) {
      res.json(
        AuthlinkCrudErrorHandler.badRequest("Missing code: refresh token.")
      );
      return;
    }
    const { access_token, expires_in, refresh_token } =
      await Authlink.refreshToken(code);
    res.json(
      AuthlinkCrudSuccessHandler.accepted({
        access_token,
        expires_in,
        refresh_token,
        issue_time: Math.floor(Date.now() / 1000),
      })
    );
    return;
  }
);

export const revokeToken = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  mainLogger.info(`Revoke token: ${code}`);
  if (!code) {
    res.json(
      AuthlinkCrudErrorHandler.badRequest("Missing code: access token.")
    );
    return;
  }
  await Authlink.revokeToken(code);
  res.json(AuthlinkCrudSuccessHandler.ok({}));
  return;
});
