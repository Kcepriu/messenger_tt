import { create } from "zustand";
import { httpServices } from "../services/http.service";

interface IChatsStore {
  chats: IChat[];
  messageError: string;
  isLoading: boolean;
  currentCreateChat: IChat | null;

  readChats: (idUser: string) => void;
  setStatusChatToEdit: (editChat: IChat) => void;
  deleteChat: (deletedChat: IChat) => void;
  saveChat: (editChat: IChat) => void;
  addChat: (idRecipient: string, newChat: ICreatedChat) => void;
  clearMessageError: () => void;
}

export const useChatsStore = create<IChatsStore>((set, get) => ({
  chats: [],
  messageError: "",
  isLoading: false,
  currentCreateChat: null,
  readChats: async (idUser: string) => {
    await set(() => ({
      isLoading: true,
      messageError: "",
    }));
    const chats = await httpServices.getChats(idUser);

    set(() => ({
      chats,
      isLoading: false,
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
    await set(() => ({
      isLoading: true,
      messageError: "",
    }));

    const result = await httpServices.deleteChat(deletedChat.id);

    if (!result) {
      await set(() => ({
        isLoading: false,
        messageError: "Error deleted chat",
      }));
      return;
    }

    const chats = get().chats;

    set(() => ({
      chats: chats.filter((chat) => chat.id !== deletedChat.id),
      isLoading: false,
    }));
  },

  saveChat: async (editChat: IChat) => {
    await set(() => ({
      isLoading: true,
      messageError: "",
    }));

    try {
      await httpServices.editChats(editChat.id, {
        ...editChat,
        status: "send",
      });

      const chats = get().chats;
      const indexChat = chats.findIndex((chat) => chat.id === editChat.id);

      if (indexChat === -1) throw new Error("Error edit chat");

      chats[indexChat] = { ...editChat, status: "send" };

      set(() => ({ chats: [...chats], isLoading: false }));
    } catch (err) {
      const messageError =
        err instanceof Error ? err.message : "Error edit chat";
      await set(() => ({
        isLoading: false,
        messageError,
      }));
    }
  },
  // addChat: (addChat: ICreatedChat) => void;

  addChat: async (idRecipient: string, newChat: ICreatedChat) => {
    await set(() => ({
      isLoading: true,
      messageError: "",
    }));

    try {
      const chat = await httpServices.addChats(idRecipient, newChat);

      set((store) => ({ chats: [...store.chats, chat], isLoading: false }));
    } catch (err) {
      const messageError =
        err instanceof Error ? err.message : "Error add chat";
      await set(() => ({
        isLoading: false,
        messageError,
      }));
    }
  },

  clearMessageError: () => {
    set(() => ({
      messageError: "",
    }));
  },
}));
