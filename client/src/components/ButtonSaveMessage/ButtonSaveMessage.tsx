import { FC } from "react";
import { FaRegSave } from "react-icons/fa";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";
import { useChatsStore } from "../../stores";

interface IProps {
  chat: IChat;
}

const ButtonSaveMessage: FC<IProps> = ({ chat }) => {
  const saveChat = useChatsStore((store) => store.saveChat);

  return (
    <ButtonCommon
      icon={FaRegSave}
      size="big"
      checked={true}
      onClick={() => saveChat(chat)}
    />
  );
};

export { ButtonSaveMessage };
