import { FC } from "react";

interface IProps {
  attach: string;
}

const AttachReadOnly: FC<IProps> = ({ attach }) => {
  return (
    <div className="flex flex-col h-14 items-center  p-4 border relative">
      <a href={attach} target="_blank" rel="noreferrer">
        file
      </a>
    </div>
  );
};

export { AttachReadOnly };
