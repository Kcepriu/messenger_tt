import { create } from "zustand";
import { useChatsStore } from "./chats.store";
import { useAuthStore } from "./auth.store";
import { httpServices } from "../services/http.service";

interface IUsersStore {
  users: IUser[];
  currentUser: IUser | null;
  readUsers: () => void;
  setCurrentUser: (currentUser: IUser) => void;
  increaseNumberUnreadMessages: (userId: string) => void;
}

export const useUsersStore = create<IUsersStore>((set, get) => ({
  users: [],
  currentUser: null,

  readUsers: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    const users = await httpServices.getUsers();
    set(() => ({ users }));
  },

  setCurrentUser: (currentUser) => {
    const users = get().users;
    const newUsers = users.map((user) => {
      user.numberUnreadMessages;
      return {
        ...user,
        currentUser: currentUser.id === user.id,
        numberUnreadMessages:
          currentUser.id === user.id ? 0 : user.numberUnreadMessages,
      };
    });

    set(() => ({ users: newUsers, currentUser }));

    const readChats = useChatsStore.getState().readChats;
    readChats(currentUser.id);
  },

  increaseNumberUnreadMessages: (userId: string) => {
    const users = get().users;
    const indexUser = users.findIndex((user) => user.id === userId);

    if (indexUser === -1) return;

    const user = { ...users[indexUser] };

    user.numberUnreadMessages = !user.numberUnreadMessages
      ? 1
      : user.numberUnreadMessages + 1;

    users[indexUser] = { ...user };

    set(() => ({
      users: [...users],
    }));
  },
}));
