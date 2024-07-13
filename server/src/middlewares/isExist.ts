import { Response, Request, NextFunction } from 'express';
import { BaseEntity, FindOptionsWhere } from 'typeorm';
import HttpError from '../helpers/HttpError';

const isExist = <T extends BaseEntity>(Entity: typeof BaseEntity) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await Entity.findOneBy({ id } as unknown as FindOptionsWhere<T>);

    if (!todo) {
      next(HttpError(400, `Unable to find id: ${id}`));
    }
    next();
  };
  return func;
};

export default isExist;
