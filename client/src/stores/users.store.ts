import { create } from "zustand";

const ListUsers = [
  { id: 1, name: "Serhii", numberUnreadMessages: 1, currentUser: false },
  { id: 2, name: "Tamara", numberUnreadMessages: 0, currentUser: true },
];
interface IUsersStore {
  users: IUser[];
  readUser: () => void;
  setCurrentUser: (currentUser: IUser) => void;
}

export const useUsersStore = create<IUsersStore>((set, get) => ({
  users: [],

  readUser: () => {
    set(() => ({ users: [...ListUsers] }));
  },

  setCurrentUser: (currentUser) => {
    const users = get().users;
    const newUsers = users.map((user) => {
      return { ...user, currentUser: currentUser.id === user.id };
    });

    set(() => ({ users: newUsers }));
  },
}));
