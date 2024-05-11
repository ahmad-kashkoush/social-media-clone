import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  savedCollectionId: import.meta.env.VITE_APPWRITE_SAVED_COLLECTION_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
};

export const client = new Client()
  .setProject(appwriteConfig.projectId)
  .setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);