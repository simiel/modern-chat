interface ChatRoom {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: any[];
  title: string;
  description: string;
}

interface Message {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: any[];
  content: string;
  senderId: string;
  senderName: string;
  senderImageUrl: string;
  chatroomId: string;
}

interface User {
  id: string;
  fullName: string;
  imageUrl: string;
  email: string;
}

export type { ChatRoom, Message, User };
