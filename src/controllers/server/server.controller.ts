import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { Server } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import { isServerDoc } from "../../services/server.service";
import SuccessHandler from "../../common/success-handler.common";

const ServerControllerErrorHandler = new ErrorHandler("Server Controller");
const ServerControllerSuccessHandler = new SuccessHandler("Server Controller");

// ===== CUSTOM FUNCS HERE =====

export const checkRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (isServerDoc(req.body)) {
      await next();
      return;
    }
    res.json(
      ServerControllerErrorHandler.badRequest(
        "Recieved request with invalid body."
      )
    );
    return;
  }
);

export const checkExistence = asyncHandler(
  async (req: Request, res: Response, next?: NextFunction) => {
    if (await Server.service.isThere(req.params.serverId)) {
      await next();
      return;
    }
    res.json(ServerControllerErrorHandler.notFound("Server does not exist!"));
    return;
  }
);

export const checkAvailability = asyncHandler(
  async (req: Request, res: Response, next?: NextFunction) => {
    if (!(await Server.service.isThere(req.params.serverId))) {
      await next();
      return;
    }
    res.json(ServerControllerErrorHandler.conflict("Server already exists!"));
    return;
  }
);

export const checkAvailabilityRoute = asyncHandler(
  async (req: Request, res: Response) => {
    const availability = !(await Server.service.isThere(req.params.serverId));
    res.json(ServerControllerSuccessHandler.ok(availability));
    return;
  }
);

export const checkExistenceRoute = asyncHandler(
  async (req: Request, res: Response) => {
    const existence = await Server.service.isThere(req.params.serverId);
    res.json(ServerControllerSuccessHandler.ok(existence));
    return;
  }
);
