import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { validateFile } from "../../middlewares/validateFile";
import { upload } from "../../middlewares/upload";
import { filesController } from "../../controllers/files.controller";
import tryCatch from "../../helpers/tryCatch";

const filesRouter: Router = Router();

filesRouter.post(
  "",
  auth,
  upload.array("file"),
  validateFile,
  tryCatch(filesController.uploadFiles.bind(filesController))
);

export default filesRouter;
