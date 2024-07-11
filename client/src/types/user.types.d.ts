interface IResponseUsers {
  data: IUser[];
}

interface IUser {
  id: number;
  name: string;
  numberUnreadMessages: number;
  currentUser: boolean;
}
