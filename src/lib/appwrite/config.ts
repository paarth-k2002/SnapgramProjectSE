import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  apiKey:
    "599a636b54b3095e70a3f2714b7309c1d4e030d939458be213f2d12f72e900e3111c9de83b16dc844b9a129ddac0d3c982c2ae2a0ed2d27a0963a27a07a797e9438ffd4d25a53fc00bd4f38f96999143e75b3a2924c80b44b088709efb191353b78a7c0b53ac214a3821ab173047d23120161b78bc111221a91c6cba28289d2e",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
