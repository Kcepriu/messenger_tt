import { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";

interface IProps {
  attach: IAttach;
  handlerDelete: () => void;
}
const Attach: FC<IProps> = ({ attach, handlerDelete }) => {
  const handlerDeleteAttach = () => {
    if (!handlerDelete) return;
    handlerDelete();
  };
  const { file } = attach;
  return (
    <div className="flex flex-col h-14 items-center  p-4 border relative">
      <ButtonCommon
        icon={IoCloseSharp}
        size="tiny"
        checked={true}
        className="absolute top-[2px] right-[2px]"
        onClick={handlerDeleteAttach}
      />

      <p>{file.name}</p>
    </div>
  );
};

export { Attach };
