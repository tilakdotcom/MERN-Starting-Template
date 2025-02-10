export interface TUser {
  avatar: null;
  createdAt: string;
  email: string;
  updatedAt: string;
  user: string;
  verifiedEmail: boolean;
  _id: string;
}

export interface Data {
  message: string;
  data: TUser;
}
