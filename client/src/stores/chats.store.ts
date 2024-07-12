import { create } from "zustand";
import { chatsService } from "../services";

interface IChatsStore {
  chats: IChat[];
  currentCreateChat: IChat | null;

  readChats: (idUser: number) => void;
  setStatusChatToEdit: (editChat: IChat) => void;
  deleteChat: (deletedChat: IChat) => void;
  saveChat: (editChat: IChat) => void;
}

export const useChatsStore = create<IChatsStore>((set, get) => ({
  chats: [],
  currentCreateChat: null,
  readChats: async (idUser: number) => {
    const chats = await chatsService.getChats(idUser);
    set(() => ({
      chats,
    }));
  },

  setStatusChatToEdit: (editChat: IChat) => {
    const chats = get().chats;
    const indexChat = chats.findIndex((chat) => chat.id === editChat.id);
    if (indexChat === -1) return;

    chats[indexChat] = { ...editChat, status: "edit" };

    set(() => ({ chats: [...chats] }));
  },

  deleteChat: async (deletedChat: IChat) => {
    const result = await chatsService.deleteChat(deletedChat);

    if (!result) return;
    const chats = get().chats;
    set(() => ({ chats: chats.filter((chat) => chat.id !== deletedChat.id) }));
  },

  saveChat: async (editChat: IChat) => {
    const result = await chatsService.saveChat(editChat);

    if (!result) return;

    const chats = get().chats;
    const indexChat = chats.findIndex((chat) => chat.id === editChat.id);

    if (indexChat === -1) return;

    chats[indexChat] = { ...editChat, status: "send" };

    set(() => ({ chats: [...chats] }));
  },
}));
