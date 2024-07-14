import { Response, Request } from "express";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError";
import { createToken } from "../helpers/crypto";
import { userService, type UserService } from "../services/user.service";
import { RequestType } from "../types/servises.type";
import { IUser } from "../types/users.type";

export class AuthController {
  constructor(private userService: UserService) {}

  private getUserToReply(user: IUser) {
    const {
      password: userPass,

      ...updateUser
    } = user;
    return updateUser;
  }

  // * currentUser
  async currentUser(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    const { password, ...foundUser } = user;

    res.status(200).json({ code: 200, data: foundUser });
  }

  // * Users
  async users(req: Request, res: Response) {
    const { user } = req as RequestType;

    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    const { password, ...foundUser } = user;

    const data = await this.userService.getAllUser(foundUser.id);

    res.status(200).json({ code: 200, data });
  }

  // * Login
  async login(req: Request, res: Response) {
    const { email = "", password = "" } = req.body;
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const accessToken = createToken({ id: user.id });

    const newUser = await this.userService.updateUserById(user.id, {
      ...user,
      accessToken,
    });
    const updateUser = this.getUserToReply(newUser);
    res
      .status(200)
      .json({ code: 200, data: { accessToken, user: updateUser } });
  }

  // * Logout
  async logout(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    await this.userService.updateUserById(user.id, {
      ...user,
      accessToken: "",
    });

    res.status(200).json({ code: 200, message: "Successful logout" });
  }

  // * Register
  async register(req: Request, res: Response) {
    const { email = "", password = "" } = req.body;

    const user = await this.userService.findUserByEmail(email);

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.createUser({
      ...req.body,
      password: hashPassword,
    });

    const { id, ...createdUser } = newUser;
    const accessToken = createToken({ id });
    const userWithToken = await this.userService.updateUserById(id, {
      ...createdUser,
      accessToken,
    });

    res
      .status(200)
      .json({ code: 200, data: { accessToken, user: userWithToken } });
  }
}

const authController = new AuthController(userService);

export default authController;
