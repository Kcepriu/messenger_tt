import { create } from "zustand";
import { httpServices } from "../services/http.service";
interface IAuthStore {
  user: IAuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  messageError: string;
  logIn: (values: ILogInUser) => void;
  registration: (values: IRegistrationUser) => void;
  logOut: () => void;
  autoLogIn: () => void;
  clearMessageError: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  messageError: "",

  autoLogIn: async () => {
    await set(() => ({
      isLoading: true,
    }));

    const user = await httpServices.getCurrentUser();

    set(() => ({
      user,
      isLoggedIn: !!user,
      isLoading: false,
    }));
  },

  logIn: async (values: ILogInUser) => {
    void values;
    await set(() => ({
      isLoading: true,
      messageError: "",
    }));

    try {
      const user = await httpServices.login(values);

      set(() => ({
        user,
        isLoggedIn: !!user,
        isLoading: false,
      }));
    } catch (err) {
      const messageError = err instanceof Error ? err.message : "Error LogIn";
      set(() => ({
        user: null,
        isLoggedIn: false,
        isLoading: false,
        messageError,
      }));
    }
  },

  registration: async (values: IRegistrationUser) => {
    void values;
    await set(() => ({
      isLoading: true,
      messageError: "",
    }));

    try {
      const user = await httpServices.register(values);

      set(() => ({
        user,
        isLoggedIn: !!user,
        isLoading: false,
      }));
    } catch (err) {
      const messageError =
        err instanceof Error ? err.message : "Error Registration";
      set(() => ({
        user: null,
        isLoggedIn: false,
        isLoading: false,
        messageError,
      }));
    }
  },

  logOut: async () => {
    await httpServices.logout();

    set(() => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
    }));
  },
  clearMessageError: () => {
    set(() => ({
      messageError: "",
    }));
  },
}));
