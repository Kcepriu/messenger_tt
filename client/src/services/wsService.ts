import { URLS } from "../constants/app-keys.const";

class WS_Service {
  private socket: WebSocket;
  private urlServerWS: string;

  constructor(urlServerWS: string) {
    this.urlServerWS = urlServerWS;
    this.socket = new WebSocket(this.urlServerWS);
  }

  async connect() {
    this.socket = await new WebSocket(this.urlServerWS);
  }

  addEvents() {
    this.socket.onopen = () => console.log("Connect to webSocket is access");

    this.socket.onmessage = (event) => {
      const inputObj = JSON.parse(event.data);

      console.log("Input message", inputObj);
    };
  }

  async sendMessage(message: string) {
    if (this.socket.readyState === this.socket.CLOSED) {
      console.log("Reconnect");
      await this.connect();
    }
    console.log("SEND");
    this.socket.send(message);
  }
}

export const wsService = new WS_Service(URLS.urlServerWS);
