import { Client, Databases } from 'react-native-appwrite';

if (!process.env.EXPO_PUBLIC_CLERK_APPWRITE_APP_ID) {
  throw new Error(
    'EXPO_PUBLIC_CLERK_APPWRITE_APP_ID is not defined. Please set it in your environment variables.'
  );
}

const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_CLERK_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.EXPO_PUBLIC_CLERK_APPWRITE_APP_ID,
  platform: 'test.simiel.modernchat',
  db: process.env.EXPO_PUBLIC_CLERK_APPWRITE_APP_ID,
  col: {
    chatrooms: process.env.EXPO_PUBLIC_CLERK_APPWRITE_CHATROOMS_ID,
    messages: process.env.EXPO_PUBLIC_CLERK_APPWRITE_MESSAGES_ID,
  },
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const db = new Databases(client);

export { appwriteConfig, client, db };
