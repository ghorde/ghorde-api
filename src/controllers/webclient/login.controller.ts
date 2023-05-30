import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Cardboard } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { mainLogger } from "../../main";

const CardboardCrudErrorHandler = new ErrorHandler("Cardboard Crud");
const CardboardCrudSuccessHandler = new SuccessHandler("Cardboard Crud");

export const issueToken = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    res.json(CardboardCrudErrorHandler.badRequest("Missing code."));
    return;
  }
  const { access_token, expires_in, refresh_token } =
    await Cardboard.exchangeInitialToken(code);
  res.json(
    CardboardCrudSuccessHandler.created({
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
        CardboardCrudErrorHandler.badRequest("Missing code: refresh token.")
      );
      return;
    }
    const { access_token, expires_in, refresh_token } =
      await Cardboard.refreshToken(code);
    res.json(
      CardboardCrudSuccessHandler.accepted({
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
      CardboardCrudErrorHandler.badRequest("Missing code: access token.")
    );
    return;
  }
  await Cardboard.revokeToken(code);
  res.json(CardboardCrudSuccessHandler.ok({}));
  return;
});
