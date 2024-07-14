import { ListTestChats } from "../test_data/test_data";

class ChatsService {
  private baseUrl: string = "";
  constructor() {
    this.baseUrl = process.env.VITE_BACKEND_URL || "";
  }

  async getChats(idUser: string): Promise<IChat[]> {
    console.log("baseUrl", this.baseUrl);
    console.log("idUser", idUser);

    return [...ListTestChats];
  }

  async deleteChat(chat: IChat): Promise<boolean> {
    console.log("Deleted chad id=", chat.id);
    return true;
  }

  async saveChat(chat: IChat): Promise<boolean> {
    console.log("Save chad id=", chat.id);
    return true;
  }
}

export const chatsService = new ChatsService();
