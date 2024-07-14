import axios, { AxiosInstance } from "axios";
import { BACKEND_ROUTES, STORAGE_KEYS } from "../constants/app-keys.const";

class HttpService {
  private accessToken: string = "";

  private instance: AxiosInstance;

  constructor() {
    const baseUrl = process.env.VITE_BACKEND_URL || "";
    this.instance = axios.create({ baseURL: baseUrl });
    this.setAuthHeader(this.readTokenFromLocalStorage());
  }

  private readTokenFromLocalStorage(): string {
    try {
      const data: string =
        localStorage.getItem(STORAGE_KEYS.JWT_TOKEN_AUTH) || "";
      return data;
    } catch {
      return "";
    }
  }

  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN_AUTH, token);
  }

  setAuthHeader = (accessToken: string) => {
    this.accessToken = accessToken;
    this.instance.defaults.headers.common.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : "";
    this.saveTokenToLocalStorage(this.accessToken);
  };

  async getChats(idRecipient: string): Promise<IChat[]> {
    try {
      const { data: responsData } = await this.instance.get(
        `${BACKEND_ROUTES.MESSAGE}/${idRecipient}`
      );

      const { code, data } = responsData;

      if (code === 200) return data;
    } catch {
      return [];
    }
    return [];
  }

  async deleteChat(id: string): Promise<boolean> {
    try {
      const { data: responsData } = await this.instance.delete(
        `${BACKEND_ROUTES.MESSAGE}/${id}`
      );

      const { code, data } = responsData;

      if (code === 200) return data;
    } catch {
      return false;
    }
    return false;
  }

  async addChats(idRecipient: string, chat: ICreatedChat): Promise<IChat> {
    const { data: responsData } = await this.instance.post(
      `${BACKEND_ROUTES.MESSAGE}/${idRecipient}`,
      chat
    );

    const { code, data, message } = responsData;
    if (code !== 201) throw new Error(message);

    return data;
  }

  async editChats(id: string, chat: IChat): Promise<IChat> {
    const { data: responsData } = await this.instance.put(
      `${BACKEND_ROUTES.MESSAGE}/${id}`,
      chat
    );

    const { code, data, message } = responsData;
    if (code !== 200) throw new Error(message);

    return data;
  }

  async getUsers(): Promise<IUser[]> {
    try {
      const { data: responsData } = await this.instance.get(
        BACKEND_ROUTES.USERS
      );

      const { code, data } = responsData;

      if (code === 200) return data;
    } catch {
      return [];
    }
    return [];
  }

  // *  Authorization
  async getCurrentUser(): Promise<IAuthUser | null> {
    if (!this.accessToken) return null;

    try {
      const { data: responsData } = await this.instance.get(
        BACKEND_ROUTES.CURRENT_USER
      );

      const { code, data } = responsData;

      if (code === 200) return data;
    } catch {
      this.setAuthHeader("");
    }

    return null;
  }

  async login(user: ILogInUser): Promise<IAuthUser> {
    const { data: responsData } = await this.instance.post(
      BACKEND_ROUTES.LOGIN,
      user
    );

    const { code, data, message } = responsData;

    if (code !== 200) throw new Error(message);

    this.setAuthHeader(data.accessToken);

    return data.user;
  }

  async register(user: IRegistrationUser): Promise<IAuthUser> {
    const { data: responsData } = await this.instance.post(
      BACKEND_ROUTES.REGISTER,
      user
    );

    const { code, data, message } = responsData;

    if (code !== 200) throw new Error(message);

    this.setAuthHeader(data.accessToken);

    return data.user;
  }

  async logout(): Promise<boolean> {
    try {
      const { data: responsData } = await this.instance.post(
        BACKEND_ROUTES.LOGOUT
      );

      const { code } = responsData;
      if (code !== 200) return false;

      return true;
    } catch {
      return false;
    }
  }
}

const httpServices = new HttpService();

export { httpServices };
