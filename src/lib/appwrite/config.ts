import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import { appwriteVariables } from "./appwriteConfig";

export const appwriteConfig = {
  url: appwriteVariables.VITE_APPWRITE_URL,
  projectId: appwriteVariables.VITE_APPWRITE_PROJECT_ID,
  storageId: appwriteVariables.VITE_APPWRITE_STORAGE_ID,
  databaseId: appwriteVariables.VITE_APPWRITE_DATABASE_ID,
  postCollectionId: appwriteVariables.VITE_APPWRITE_POSTS_COLLECTION_ID,
  savedCollectionId: appwriteVariables.VITE_APPWRITE_SAVED_COLLECTION_ID,
  usersCollectionId: appwriteVariables.VITE_APPWRITE_USERS_COLLECTION_ID,
};

export const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
