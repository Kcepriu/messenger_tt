import { Application } from "express";
//import messagesRouter from "./api/messages.route";
import authRouter from "./api/auth.route";

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get("/", (_req, res) => {
      res.status(200).json({ code: 200, data: "OK" });
      res.send("API Running");
    });
    this.app.use("/api/auth", authRouter);
    // this.app.use("/api/messages", messagesRouter);
  }
}

export default AppRouter;
