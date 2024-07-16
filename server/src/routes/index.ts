import { Application } from "express";
import chatsRouter from "./api/chats.route";
import authRouter from "./api/auth.route";
import filesRouter from "./api/files.route";

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get("/", (_req, res) => {
      res.status(200).json({ code: 200, data: "OK" });
      res.send("API Running");
    });
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/chats", chatsRouter);
    this.app.use("/api/files", filesRouter);
  }
}

export default AppRouter;
