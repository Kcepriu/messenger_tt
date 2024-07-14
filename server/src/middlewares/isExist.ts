import { Response, Request, NextFunction } from "express";
import { connectorDB } from "../config/database";
import { doc, getDoc } from "firebase/firestore";
import HttpError from "../helpers/HttpError";

const isExist = (nameCollection: string) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!connectorDB.db) {
      throw HttpError(500, "Not connect to database");
    }

    const documentRef = doc(connectorDB.db, nameCollection, id);
    const documentSnapshot = await getDoc(documentRef);

    if (!documentSnapshot.exists()) {
      next(HttpError(400, `Unable to find id: ${id}`));
    }

    next();
  };

  return func;
};

export default isExist;
