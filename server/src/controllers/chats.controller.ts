import { Response, Request } from "express";

import { RequestType } from "../types/servises.type";
import HttpError from "../helpers/HttpError";
import fs from "fs";
import { chatService, type ChatService } from "../services/chat.service";
import { filesService, FilesService } from "../services/files.service";

export class ChatsController {
  constructor(
    private chatService: ChatService,
    private filesService: FilesService
  ) {}

  async uploadFiles(req: Request, res: Response) {
    const { files } = req as RequestType;

    const urlFiles = await Promise.all(
      //@ts-ignore
      files?.map(async (file) => {
        const url = await this.filesService.uploadFile(
          file.filename,
          file.path
        );
        fs.rm(file.path, () => {});
        return url;
      })
    );

    res.status(200).json({ code: 200, data: urlFiles });
  }

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

const chatsController = new ChatsController(chatService, filesService);
export { chatsController };
