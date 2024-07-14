import HttpError from "../helpers/HttpError";
import { IUser, ICreatedUser, IUserInform } from "../types/users.type";
import {
  collection,
  getDocs,
  doc,
  query,
  getDoc,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { connectorDB } from "../config/database";

// Функція для перевірки типу IUser
function isIUser(data: any): data is IUser {
  return (
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.password === "string" &&
    typeof data.accessToken === "string"
  );
}

class UserService {
  async getAllUser(id: string): Promise<IUserInform[]> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connect to database");
    }

    const q = query(collection(connectorDB.db, "user"));

    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        if (isIUser(data)) {
          const { accessToken, password, ...clearData } = data;
          return {
            ...clearData,
            id: doc.id,
          };
        } else {
          throw new Error("Invalid user data");
        }
      })
      .filter((user) => user.id !== id);

    return users;
  }

  async findUserById(id: string): Promise<IUser | null> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connect to database");
    }

    const userRef = doc(connectorDB.db, "user", id);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return null;
    }

    const data = userSnapshot.data();

    if (isIUser(data)) {
      return {
        ...data,
        id: userSnapshot.id,
      };
    }

    return null;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connect to database");
    }

    const q = query(
      collection(connectorDB.db, "user"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    if (isIUser(data)) {
      return {
        ...data,
        id: doc.id,
      };
    }

    return null;
  }

  async updateUserById(id: string, data: Partial<IUser>): Promise<IUser> {
    if (!connectorDB.db) {
      throw new Error("Not connected to database");
    }

    const { id: idDelete, ...updateData } = data;

    try {
      const userRef = doc(connectorDB.db, "user", id);
      await updateDoc(userRef, updateData);

      const updateUser = await this.findUserById(userRef.id);

      if (!updateUser) throw HttpError(400, "Error updating user");
      return updateUser;
    } catch (e) {
      throw HttpError(400, "Error updating user");
    }
  }

  async createUser(user: ICreatedUser): Promise<IUser> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connect to database");
    }

    const { confirmPassword, ...newUser } = user;
    void confirmPassword;
    try {
      const userRef = await addDoc(collection(connectorDB.db, "user"), {
        ...newUser,
        accessToken: "",
      });

      const createdUser = await this.findUserById(userRef.id);

      if (!createdUser) throw HttpError(400, "Error create user");
      return createdUser;
    } catch (e) {
      throw HttpError(400, "Error create user");
    }
  }
}
const userService = new UserService();
export { userService, UserService };
