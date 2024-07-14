import { FC } from "react";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";
import { IoIosSend } from "react-icons/io";
interface IProps {
  handlerSend: () => void;
}

const ButtonSend: FC<IProps> = ({ handlerSend }) => {
  return (
    <ButtonCommon
      icon={IoIosSend}
      size="big"
      checked={true}
      onClick={handlerSend}
    />
  );
};

export { ButtonSend };
