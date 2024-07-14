import { Response, Request, NextFunction } from 'express';
import { AnySchema } from 'joi';
import HttpError from '../helpers/HttpError';

const validateBody = (schema: AnySchema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

export default validateBody;
