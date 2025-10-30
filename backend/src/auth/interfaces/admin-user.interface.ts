import { AdminRole } from '../dto';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
