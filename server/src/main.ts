import express, { Response, Request, NextFunction } from "express";
// import WebSocket from "ws";
import { createServer } from "http";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import AppRouter from "./routes";
import { IError } from "./types/servises.type";
import { connectorDB, initConnector } from "./config/database";

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);

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

// const wss = new WebSocket.Server(
//   {
//     server,
//     // path: "/websockets",
//   },
//   () => console.log("Start websocket")
// );

// wss.on("connection", function connection(ws) {
//   console.log("Connect client");

//   ws.on("error", console.error);

//   ws.on("message", function message(data) {
//     const inputObj = JSON.parse(data.toString());

//     console.log("received: ", inputObj);

//     ws.send("Test dddd");
//   });

//   ws.on("close", (e) => {
//     console.log("Cose connection", e);
//   });

//   ws.send("something");
// });

server.listen(PORT, () => console.log(`Server start on PORT ${PORT}`));

export default server;
