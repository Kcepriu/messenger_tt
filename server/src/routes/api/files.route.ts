import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { validateFile } from "../../middlewares/validateFile";
import { upload } from "../../middlewares/upload";
import { chatsController } from "../../controllers/chats.controller";
import tryCatch from "../../helpers/tryCatch";

const filesRouter: Router = Router();

filesRouter.post(
  "",
  auth,
  upload.array("file"),
  validateFile,
  tryCatch(chatsController.uploadFiles.bind(chatsController))
);

export default filesRouter;
