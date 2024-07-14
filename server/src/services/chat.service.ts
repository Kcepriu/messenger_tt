import HttpError from "../helpers/HttpError";
import { IChat } from "../types/chat.type";
import {
  collection,
  getDocs,
  doc,
  query,
  getDoc,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  and,
  or,
} from "firebase/firestore";
import { connectorDB } from "../config/database";

// Функція для перевірки типу IUser
function isIChat(data: any): data is IChat {
  return (
    typeof data.message === "string" &&
    typeof data.owner === "string" &&
    typeof data.recipient === "string" &&
    typeof data.status === "string"
  );
}

class ChatService {
  async getAllChats(idOwner: string, idRecipient: string): Promise<IChat[]> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connected to database");
    }

    const q = query(
      collection(connectorDB.db, "messages"),
      or(
        and(
          where("owner", "==", idOwner),
          where("recipient", "==", idRecipient)
        ),
        and(
          where("owner", "==", idRecipient),
          where("recipient", "==", idOwner)
        )
      )
    );

    const querySnapshot = await getDocs(q);

    const chats = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      if (isIChat(data)) {
        return {
          ...data,
          id: doc.id,
        };
      } else {
        throw HttpError(500, "Invalid data");
      }
    });
    return chats;
  }

  async findChatById(id: string): Promise<IChat | null> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connect to database");
    }

    const documentRef = doc(connectorDB.db, "messages", id);
    const documentSnapshot = await getDoc(documentRef);

    if (!documentSnapshot.exists()) {
      return null;
    }

    const data = documentSnapshot.data();

    if (isIChat(data)) {
      return {
        ...data,
        id: documentSnapshot.id,
      };
    }

    return null;
  }

  async updateChatById(
    id: string,
    data: Partial<IChat>,
    ownerId: string
  ): Promise<IChat> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connected to database");
    }

    const { id: idDelete, ...updateData } = data;

    try {
      const documentRef = doc(connectorDB.db, "messages", id);

      const documentSnapshot = await getDoc(documentRef);
      if (!documentSnapshot.exists()) {
        throw HttpError(400, "Error updating chat (not document)");
      }
      if (documentSnapshot.data().id === ownerId) {
        throw HttpError(400, "Error updating chat (error permission)");
      }

      await updateDoc(documentRef, updateData);

      const updateChat = await this.findChatById(documentRef.id);

      if (!updateChat) throw HttpError(400, "Error updating chat");
      return updateChat;
    } catch (e) {
      throw HttpError(400, "Error updating chat");
    }
  }

  async createChat(data: IChat): Promise<IChat> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connected to database");
    }

    try {
      const documentRef = await addDoc(
        collection(connectorDB.db, "messages"),
        data
      );

      const createdDocument = await this.findChatById(documentRef.id);

      if (!createdDocument) throw HttpError(400, "Error create chat");
      return createdDocument;
    } catch (e) {
      throw HttpError(400, "Error create chat");
    }
  }

  async deleteChat(id: string, ownerId: string): Promise<boolean> {
    if (!connectorDB.db) {
      throw HttpError(500, "Not connect to database");
    }

    try {
      const documentRef = doc(connectorDB.db, "messages", id);
      const documentSnapshot = await getDoc(documentRef);

      if (!documentSnapshot.exists()) {
        throw HttpError(400, "Error updating chat (not document)");
      }
      if (documentSnapshot.data().id === ownerId) {
        throw HttpError(400, "Error updating chat (error permission)");
      }

      await deleteDoc(documentRef);
    } catch {
      return false;
    }

    return true;
  }
}
const chatService = new ChatService();
export { chatService, ChatService };
