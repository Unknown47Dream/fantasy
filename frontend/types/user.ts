export interface User {
  id: string;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  languageCode: string;
  isPremium: boolean;
  points: number;
  xp: number;
  referralCode: string;
  referralCount: number;
  referredById: null;
  lastDailyClaimAt: null;
  dailyStreak: number;
  walletAddress: null;
  walletConnectedAt: null;
  paymentWalletAddress: null;
  paymentWalletVerified: boolean;
  paymentWalletVerifiedAt: null;
  createdAt: string;
  updatedAt: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export interface UsersQueryParams {
  page?: number;
  take?: number;
}
