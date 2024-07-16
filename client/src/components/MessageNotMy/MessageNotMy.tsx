import { FC } from "react";
import { AttachesReadOnly } from "../AttachesReadOnly/AttachesReadOnly";

interface IProps {
  chat: IChat;
}
const MessageNotMy: FC<IProps> = ({ chat }) => {
  const { attaches, message } = chat;
  void attaches;
  return (
    <div className=" block w-full ">
      <div className="p-4 flex flex-col gap-4 w-width_60p ">
        {attaches.length > 0 && <AttachesReadOnly attaches={attaches} />}
        <p className="block w-full">{message}</p>
      </div>
    </div>
  );
};

export { MessageNotMy };
