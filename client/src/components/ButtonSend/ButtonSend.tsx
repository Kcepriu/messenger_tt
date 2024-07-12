import { FC } from "react";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";
import { IoIosSend } from "react-icons/io";

const ButtonSend: FC = () => {
  return <ButtonCommon icon={IoIosSend} size="big" checked={true} />;
};

export { ButtonSend };
