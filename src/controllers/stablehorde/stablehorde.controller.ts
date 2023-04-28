import axios from "axios";
// import { AiHorde } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { isError } from "../../common/error.generic";
import { Request, Response } from "express";

import AIHorde from "@zeldafan0225/ai_horde";
import { mainLogger } from "../../main";

const AiHordeControllerErrorHandler = new ErrorHandler("AiHorde Controller");
const AiHordeControllerSuccessHandler = new SuccessHandler(
  "AiHorde Controller"
);

const AiHorde = new AIHorde({
  cache_interval: 1000 * 10,
  cache: {
    generations_check: 1000 * 30,
  },
  client_agent: "ghorde-api:v0.0.1:ham@kodski.com",
});

export const shGenerate = async (req: Request, res: Response) => {
  const { prompt, model, token } = req.body;
  if (prompt) {
    // start the generation of an image with the given payload
    const data = await AiHorde.postAsyncImageGenerate(
      {
        prompt,
        models: [model || "stable_diffusion"],
      },
      { token: token || "0000000000" }
    );
    mainLogger.info(data);
    const { id } = data;
    res.json({ id });
    return;
  }
  res.json(AiHordeControllerErrorHandler.badRequest("No prompt provided"));
  return;
};

export const shCheck = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const check = await AiHorde.getImageGenerationCheck(id);
    mainLogger.info(check);
    res.json(check);
    return;
  }
  res.json(AiHordeControllerErrorHandler.badRequest("No id provided"));
  return;
};

export const shGet = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const image = await AiHorde.getImageGenerationStatus(id);
    res.json(image);
    return;
  }
  res.json(AiHordeControllerErrorHandler.badRequest("No id provided"));
  return;
};

export const shGetModels = async (req: Request, res: Response) => {
  const models = await AiHorde.getModels();
  if (models) {
    res.json(models);
    return;
  }
  res.json(AiHordeControllerErrorHandler.internal("No models found"));
  return;
};
