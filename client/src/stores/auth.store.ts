import { create } from "zustand";

interface IAuthStore {
  user: IAuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  logIn: (values: ILogInUser) => void;
  registration: (values: ILogInUser) => void;
  logOut: () => void;
  autoLogIn: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  autoLogIn: async () => {
    const user = {
      id: 256,
      name: "Serhii Kos",
    };

    set(() => ({
      user,
      isLoggedIn: !!user,
      isLoading: false,
    }));
  },

  logIn: async (values: ILogInUser) => {
    void values;
    const user = null;
    set(() => ({
      user,
      isLoggedIn: !!user,
      isLoading: false,
    }));
  },

  registration: async (values: ILogInUser) => {
    void values;
    const user = null;
    set(() => ({
      user,
      isLoggedIn: !!user,
      isLoading: false,
    }));
  },

  logOut: async () => {
    set(() => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    }));
  },
}));
