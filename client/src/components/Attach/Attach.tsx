import { FC } from "react";

interface IProps {
  attach: IAttach;
}
const Attach: FC<IProps> = ({ attach }) => {
  return (
    <div className="flex flex-col h-14 items-center  p-4 border ">
      <p>{attach.name}</p>
    </div>
  );
};

export { Attach };
