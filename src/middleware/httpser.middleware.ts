import { Request, Response, NextFunction } from "express";
export const httpser = (req: Request, res: Response, next: NextFunction) => {
  if (req.secure) {
    next();
  } else {
    res.redirect("https://" + req.headers.host + req.url);
  }
};
