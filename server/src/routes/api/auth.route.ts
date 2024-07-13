import { Router } from "express";
import validateBody from "../../middlewares/validateBody";
import tryCatch from "../../helpers/tryCatch";
import { schemaAuthorize, schemaRegistration } from "../../schemas/authSchema";
import authController from "../../controllers/auth.controller";
import { auth } from "../../middlewares/auth";

const authRouter: Router = Router();

authRouter.get(
  "/current",
  auth,
  tryCatch(authController.currentUser.bind(authController))
);

//users
authRouter.get(
  "/users",
  auth,
  tryCatch(authController.users.bind(authController))
);

// * Login
authRouter.post(
  "/login",
  validateBody(schemaAuthorize),
  tryCatch(authController.login.bind(authController))
);

// * Register
authRouter.post(
  "/register",
  validateBody(schemaRegistration),
  tryCatch(authController.register.bind(authController))
);

// *Logout
authRouter.post(
  "/logout",
  auth,
  tryCatch(authController.logout.bind(authController))
);

export default authRouter;
