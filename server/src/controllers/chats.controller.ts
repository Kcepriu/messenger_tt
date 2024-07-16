import { Response, Request } from "express";

import { RequestType } from "../types/servises.type";
import HttpError from "../helpers/HttpError";

import { chatService, type ChatService } from "../services/chat.service";

export class ChatsController {
  constructor(private chatService: ChatService) {}

  // * getAllChats
  async getAllChats(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    const { id } = req.params;

    const chats = await this.chatService.getAllChats(user.id, id);

    res.status(200).json({ code: 200, data: chats });
  }

  // * addChat
  async addChat(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    const { id } = req.params;

    const chat = await this.chatService.createChat({
      ...req.body,
      owner: user.id,
      recipient: id,
      status: "send",
    });

    res.status(201).json({ code: 201, data: chat });
  }

  // * changeChat
  async changeChat(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    const { id } = req.params;

    const chat = await this.chatService.updateChatById(
      id,
      { ...req.body },
      user.id
    );
    res.status(200).json({ code: 200, data: chat });
  }

  // * deleteChat
  async deleteChat(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    const { id } = req.params;
    const result = await this.chatService.deleteChat(id, user.id);
    res.status(200).json({ code: 200, data: result });
  }
}

const chatsController = new ChatsController(chatService);
export { chatsController };
