export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  accessToken: string;
}

export interface IUserInform {
  id: string;
  name: string;
  email: string;
}

export interface ICreatedUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
