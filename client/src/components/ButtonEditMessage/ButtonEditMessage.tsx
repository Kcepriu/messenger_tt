import { FC } from "react";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";
import { MdOutlineEdit } from "react-icons/md";
import { useChatsStore } from "../../stores";

interface IProps {
  chat: IChat;
}
const ButtonEditMessage: FC<IProps> = ({ chat }) => {
  const setStatusChatToEdit = useChatsStore(
    (store) => store.setStatusChatToEdit
  );
  return (
    <ButtonCommon
      icon={MdOutlineEdit}
      size="big"
      checked={true}
      onClick={() => setStatusChatToEdit(chat)}
    />
  );
};

export { ButtonEditMessage };
