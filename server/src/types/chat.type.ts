export interface IChat {
  id: string;
  message: string;
  owner: string;
  recipient: string;
  status: "send" | "created" | "edit";
}
