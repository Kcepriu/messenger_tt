import { Response, Request, NextFunction } from "express";
import HttpError from "../helpers/HttpError";

export const validateFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { files } = req;

  if (!files || files.length === 0) {
    next(HttpError(400, "No attach file"));
  }

  next();
};
