export interface User {
  id: number;
  telegramId: number;
  username: string;
  firstName: string;
  lastName?: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}
