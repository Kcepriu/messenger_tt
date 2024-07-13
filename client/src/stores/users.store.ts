import { create } from "zustand";
import { useChatsStore } from "./chats.store";
import { useAuthStore } from "./auth.store";
import { httpServices } from "../services/http.service";

interface IUsersStore {
  users: IUser[];
  readUsers: () => void;
  setCurrentUser: (currentUser: IUser) => void;
}

export const useUsersStore = create<IUsersStore>((set, get) => ({
  users: [],

  readUsers: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    const users = await httpServices.getUsers();
    set(() => ({ users }));
  },

  setCurrentUser: (currentUser) => {
    const users = get().users;
    const newUsers = users.map((user) => {
      return { ...user, currentUser: currentUser.id === user.id };
    });

    set(() => ({ users: newUsers }));

    const readChats = useChatsStore.getState().readChats;
    readChats(currentUser.id);
  },
}));
