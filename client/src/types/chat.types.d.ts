interface IChat {
  id: string;
  attaches: IAttach[];
  message: string;
  owner: string;
  recipient: string;
  status: "send" | "created" | "edit";
}

interface ICreatedChat {
  attaches: IAttach[];
  message: string;
}
