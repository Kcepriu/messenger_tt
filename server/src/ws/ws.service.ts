import WebSocket, { WebSocketServer } from "ws";
import { type Server } from "http";

export class WsServer {
  private wss: WebSocketServer;

  constructor(server: Server) {
    this.wss = new WebSocket.Server(
      {
        server,
      },
      () => console.log("Start websocket")
    );

    this.wss.on("connection", (ws) => {
      ws.on("message", (data) => {
        const inputObj = JSON.parse(data.toString());

        if (inputObj.method === "connection") {
          // @ts-ignore
          ws.id = inputObj.id;
        } else if (inputObj.method === "message") {
          const { recipientId, chat } = inputObj;

          this.wss.clients.forEach((client) => {
            if (
              // @ts-ignore
              client.id === recipientId &&
              client.readyState === WebSocket.OPEN
            )
              client.send(chat);
          });
        }
      });
    });
  }
}
