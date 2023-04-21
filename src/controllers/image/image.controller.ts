import axios from "axios";
import { Image } from "../../services";
import ErrorHandler from "../../common/error-handler.common";
import SuccessHandler from "../../common/success-handler.common";
import { isError } from "../../common/error.generic";
import { Request, Response } from "express";

const ImageControllerErrorHandler = new ErrorHandler("Image Controller");
const ImageControllerSuccessHandler = new SuccessHandler("Image Controller");

export const getRandomImage = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (id) {
    const imageLink = await axios.get(
      "https://api.unsplash.com/photos/random",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    const create = {
      imgLink: imageLink.data.urls.regular,
      owner: id.toString(),
      time: Date.now(),
    };
    const dbres = await Image.service.create(create);
    if (isError(dbres)) {
      res.json(ImageControllerErrorHandler.internal(dbres.errMsg));
      return;
    }
    res.json(ImageControllerSuccessHandler.ok(dbres));
    return;
  }
  res.json(ImageControllerErrorHandler.badRequest("No id provided"));
  return;
};

export const getUserImages = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (userId) {
    const dbres = await Image.service.find({ owner: `"${userId}"` });
    if (isError(dbres)) {
      res.json(ImageControllerErrorHandler.internal(dbres.errMsg));
      return;
    }
    res.json(ImageControllerSuccessHandler.ok(dbres));
    return;
  }
  res.json(ImageControllerErrorHandler.badRequest("No user id provided"));
  return;
};
