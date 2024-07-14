import { Router } from "express";
import isExist from "../../middlewares/isExist";
import validateBody from "../../middlewares/validateBody";
import tryCatch from "../../helpers/tryCatch";
import { schemaAddChat, schemaEditChat } from "../../schemas/chatsSchema";
import { chatsController } from "../../controllers/chats.controller";
import { auth } from "../../middlewares/auth";

const chatsRouter: Router = Router();

chatsRouter.get(
  "/:id",
  auth,
  tryCatch(chatsController.getAllChats.bind(chatsController))
);

chatsRouter.post(
  "/:id",
  auth,
  isExist("user"),
  validateBody(schemaAddChat),
  tryCatch(chatsController.addChat.bind(chatsController))
);

chatsRouter.put(
  "/:id",
  auth,
  isExist("messages"),
  validateBody(schemaEditChat),
  tryCatch(chatsController.changeChat.bind(chatsController))
);

chatsRouter.delete(
  "/:id",
  auth,
  isExist("messages"),
  tryCatch(chatsController.deleteChat.bind(chatsController))
);

export default chatsRouter;
