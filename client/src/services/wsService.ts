function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class WS_Service {
  socket: WebSocket | null;
  private urlServerWS: string;
  userId: string;
  newChat: IChat | null = null;

  constructor() {
    this.urlServerWS = process.env.VITE_WS_URL || "";
    this.socket = null;
    this.userId = "";
  }

  async connect() {
    if (!this.userId) return;

    this.socket = await new WebSocket(this.urlServerWS);

    this.socket.onopen = async () => {
      await sleep(1000);
      this.socket?.send(
        JSON.stringify({
          method: "connection",
          id: this.userId,
        })
      );
    };

    // this.socket.onmessage = (event) => {
    //   this.newChat = JSON.parse(event.data);
    //   console.log("New message");
    // };
  }

  async sendMessage(recipientId: string, message: string) {
    if (!this.socket || this.socket.readyState === this.socket.CLOSED) {
      console.log("Reconnect");
      await this.connect();
    }

    if (!this.socket || this.socket.readyState === this.socket.CLOSED)
      return false;

    this.socket.send(
      JSON.stringify({
        method: "message",
        id: this.userId,
        recipientId: recipientId,
        chat: message,
      })
    );

    return true;
  }
}

export const wsService = new WS_Service();
