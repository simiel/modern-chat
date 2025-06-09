import { ChatRoom } from './types';

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
