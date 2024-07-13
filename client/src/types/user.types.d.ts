interface IResponseUsers {
  data: IUser[];
}

interface IUser {
  id: string;
  name: string;
  email: string;
  numberUnreadMessages?: number;
  currentUser?: boolean;
}
