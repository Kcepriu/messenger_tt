import { ListUsers } from "../test_data/test_data";

class UsersService {
  private baseUrl: string = "";
  constructor() {
    this.baseUrl = process.env.VITE_BACKEND_URL || "";
  }

  async getUsers(idAuthUser: number): Promise<IUser[]> {
    console.log("baseUrl", this.baseUrl);
    console.log("idUser", idAuthUser);

    return [...ListUsers];
  }
}

export const usersService = new UsersService();
