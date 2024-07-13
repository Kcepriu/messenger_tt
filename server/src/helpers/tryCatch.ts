import { Response, Request, NextFunction } from 'express';

interface Controller {
  (req: Request, res: Response): Promise<void>;
}

const tryCatch = (controller: Controller) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default tryCatch;
