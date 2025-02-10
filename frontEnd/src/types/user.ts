export interface TUser {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  updatedAt: string;
  userAgent: string;
}

export interface Data {
  message : string;
  user: TUser
}