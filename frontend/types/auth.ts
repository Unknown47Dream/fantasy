export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR';
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  success: boolean;
  admin: AdminUser;
}

export interface RefreshTokenResponse {
  success: boolean;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  admin: AdminUser;
}

export interface ErrorResponse {
  error: string;
}
