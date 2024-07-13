import { FC } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";
import { useChatsStore } from "../../stores";

interface IProps {
  chat: IChat;
}

const ButtonDeleteMessage: FC<IProps> = ({ chat }) => {
  const deleteChat = useChatsStore((store) => store.deleteChat);
  return (
    <ButtonCommon
      icon={MdDeleteOutline}
      size="big"
      checked={true}
      onClick={() => deleteChat(chat)}
    />
  );
};
//deleteChat
export { ButtonDeleteMessage };
