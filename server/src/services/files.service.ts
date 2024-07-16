import HttpError from "../helpers/HttpError";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { connectorDB } from "../config/database";

class FilesService {
  async uploadFile(filename: string, fullName: string) {
    if (!connectorDB.storage) {
      throw HttpError(500, "Not connect to database");
    }

    try {
      const fileName = `${uuidv4()}-${filename}`;

      const storageRef = ref(connectorDB.storage, `uploads/${fileName}`);

      const fileBuffer = fs.readFileSync(fullName);

      const snapshot = await uploadBytes(storageRef, fileBuffer);

      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Upload failed", error);
      throw HttpError(400, "Upload failed");
    }
  }
}

const filesService = new FilesService();
export { filesService, FilesService };
