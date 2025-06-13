import { ChatRoom, Message } from './types';

export const chatRooms: ChatRoom[] = [
  {
    id: '1',
    title: 'General Discussion',
    description: 'A place for general discussions and announcements.',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
  },
  {
    id: '2',
    title: 'Tech Talk',
    description: 'Discuss the latest in technology and programming.',
    createdAt: '2023-10-02T12:00:00Z',
    updatedAt: '2023-10-02T12:00:00Z',
  },
  {
    id: '3',
    title: 'Random Chit-chat',
    description: 'For off-topic discussions and fun.',
    createdAt: '2023-10-03T12:00:00Z',
    updatedAt: '2023-10-03T12:00:00Z',
  },
];

export const messages: Message[] = [
  {
    id: '1',
    roomId: '1',
    content: 'Welcome to the General Discussion room!',
    sender: 'System',
    timestamp: '2023-10-01T12:00:00Z',
  },
  {
    id: '2',
    roomId: '2',
    content: "Let's talk about the latest tech trends.",
    sender: 'Alice',
    timestamp: '2023-10-02T12:05:00Z',
  },
  {
    id: '3',
    roomId: '3',
    content: 'What are your favorite memes?',
    sender: 'Bob',
    timestamp: '2023-10-03T12:10:00Z',
  },
];
