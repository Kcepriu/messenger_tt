/* eslint-disable no-console */

import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

class ConnectorFirebase {
  db: Firestore | null = null;
  storage: FirebaseStorage | null = null;

  async connect() {
    try {
      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY || "",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
        projectId: process.env.FIREBASE_PROJECT_ID || "",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
        appId: process.env.FIREBASE_APP_ID || "",
        measurementId: process.env.FIREBASE_MEASUREMENT_ID || "",
      };

      const app = initializeApp(firebaseConfig);

      this.db = await getFirestore(app);
      this.storage = getStorage(app);
      console.log("Firestore Connected...");
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      process.exit(1);
    }
  }
}

async function initConnector(connectorDB: ConnectorFirebase) {
  await connectorDB.connect();
}

const connectorDB = new ConnectorFirebase();

export { initConnector, connectorDB };
