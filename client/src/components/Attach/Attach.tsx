import { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { ButtonCommon } from "../ButtonCommon/ButtonCommon";

interface IProps {
  attach: IAttach;
  withDelete: boolean;
  handlerDelete?: () => void;
}
const Attach: FC<IProps> = ({ attach, withDelete = false, handlerDelete }) => {
  const handlerDeleteAttach = () => {
    if (!handlerDelete) return;
    handlerDelete();
  };

  return (
    <div className="flex flex-col h-14 items-center  p-4 border relative">
      {withDelete && (
        <ButtonCommon
          icon={IoCloseSharp}
          size="tiny"
          checked={false}
          className="absolute top-1 right-1"
          onClick={handlerDeleteAttach}
        />
      )}

      <p>{attach.name}</p>
    </div>
  );
};

export { Attach };
