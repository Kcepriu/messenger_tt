export interface IChat {
  id: string;
  message: string;
  owner: string;
  recipient: string;
  attaches: [];
  status: "send" | "created" | "edit";
}
