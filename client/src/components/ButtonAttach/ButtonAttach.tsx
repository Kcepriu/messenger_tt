import { FC } from "react";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";
import { IoMdAttach } from "react-icons/io";

interface IProps {
  handlerOnClick: () => void;
}
const ButtonAttach: FC<IProps> = ({ handlerOnClick }) => {
  return <ButtonCommon icon={IoMdAttach} size="big" onClick={handlerOnClick} />;
};

export { ButtonAttach };
