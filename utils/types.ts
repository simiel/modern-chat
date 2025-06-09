interface ChatRoom {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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
  chatRoomId: string;
}

interface User {
  id: string;
  fullName: string;
  imageUrl: string;
  email: string;
}

export type { ChatRoom, Message, User };
