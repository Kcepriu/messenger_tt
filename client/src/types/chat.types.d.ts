interface IChat {
  id: number;
  attaches: IAttach[];
  message: string;
  owner: number;
  recipient: number;
  status: "send" | "created" | "edit";
}
