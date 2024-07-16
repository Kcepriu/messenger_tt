interface IChat {
  id: string;
  attaches: string[];
  message: string;
  owner: string;
  recipient: string;
  status: "send" | "created" | "edit";
  createdAt: number;
}

interface ICreatedChat {
  attaches: string[];
  message: string;
}
