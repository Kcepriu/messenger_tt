import express, { Response, Request, NextFunction } from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import AppRouter from "./routes";
import { IError } from "./types/servises.type";
import { connectorDB, initConnector } from "./config/database";
import { WsServer } from "./ws/ws.service";

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const wsServer = new WsServer(server);

initConnector(connectorDB);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const router = new AppRouter(app);
app.use(logger(formatsLogger));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

app.use((_req: Request, res: Response) => {
  res.status(404).json({ code: 404, message: "Not found route" });
});

app.use((err: IError, _req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ code: status, message });
  next();
});

server.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));

export default server;
