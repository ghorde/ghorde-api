import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { Request, Response } from "express";

import AIHorde from "@zeldafan0225/ai_horde";
import { mainLogger } from "../../main";
import { rounder } from "../../helpers";
import { User } from "../../services";

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
  const { prompt, model, token, height, width, karras, guildedId } = req.body;
  const userDbData = await User.service.read(guildedId);
  let useToken
  if ('hordeToken' in userDbData) {
    useToken = userDbData.hordeToken
    if (useToken === '') {
      useToken = undefined
    }
  }
  let newPrompt
  if ('negativePrompt' in userDbData) {
    newPrompt = prompt + '###' + (userDbData.negativePrompt as Array<string>).join(', ')
  }
  if (prompt && typeof prompt === 'string' && prompt.length > 0) {
    // start the generation of an image with the given payload
    // https://github.com/ZeldaFan0225/ai_horde/blob/main/docs/classes/export_.md#postasyncimagegenerate
    const data = await AiHorde.postAsyncImageGenerate({
      // https://github.com/ZeldaFan0225/ai_horde/blob/main/docs/interfaces/GenerationInput.md
      prompt: newPrompt || prompt,
      // https://github.com/ZeldaFan0225/ai_horde/blob/main/docs/interfaces/ModelGenerationInputStable.md
      params: {
        height: (rounder(parseInt(height), 64) < 3072 ? rounder(parseInt(height), 64): 576) || 576,
        width: (rounder(parseInt(width), 64) < 3072 ? rounder(parseInt(width), 64): 576) || 576,
        karras
      },
      models: [model || "stable_diffusion"],
    }, {token: token || useToken || "0000000000"});
    const { id } = data;
    res.json({ id, token: useToken ? true : false, prompt: newPrompt || prompt, model: model || "stable_diffusion" });
    return;
  }
  res.json(AiHordeControllerErrorHandler.badRequest("No prompt provided"));
  return;
};

export const shCheck = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const check = await AiHorde.getImageGenerationCheck(id);
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
