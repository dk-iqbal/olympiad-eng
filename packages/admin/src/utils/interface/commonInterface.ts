export interface User {
  name: string | undefined;
  username?: string;
  email?: string;
  phone?: string;
  organizationId?: string;
  role?: string;
  status?: boolean;
  password?: string | undefined;
  confirmpassword?: string;
  info?: string;
  address?: string;
  description?: string;
  image?: string;
  degree?: string;
  socialLink?: string;
  refreshToken?: string;
  macAddress?: string | string[];
  createdAt?: Date;
  updatedAt?: Date;
}
