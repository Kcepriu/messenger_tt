import { create } from "zustand";
import { httpServices } from "../services/http.service";
interface IAuthStore {
  user: IAuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  messageError: string;
  accessToken: string;
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
  accessToken: "",

  autoLogIn: async () => {
    await set(() => ({
      isLoading: true,
    }));

    const user = await httpServices.getCurrentUser();

    set(() => ({
      user,
      isLoggedIn: !!user,
      isLoading: false,
      accessToken: !user ? "" : user.accessToken,
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
        accessToken: !user ? "" : user.accessToken,
      }));
    } catch (err) {
      const messageError = err instanceof Error ? err.message : "Error LogIn";
      set(() => ({
        user: null,
        isLoggedIn: false,
        isLoading: false,
        accessToken: "",
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
        accessToken: !user ? "" : user.accessToken,
      }));
    } catch (err) {
      const messageError =
        err instanceof Error ? err.message : "Error Registration";
      set(() => ({
        user: null,
        isLoggedIn: false,
        isLoading: false,
        accessToken: "",
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
      accessToken: "",
    }));
  },

  clearMessageError: () => {
    set(() => ({
      messageError: "",
    }));
  },
}));
