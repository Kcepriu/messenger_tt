import { FC } from "react";
import { AttachReadOnly } from "../AttachReadOnly/AttachReadOnly";

interface IProps {
  attaches: string[];
}

const AttachesReadOnly: FC<IProps> = ({ attaches }) => {
  return (
    <ul className="w-full flex gap-4">
      {attaches.map((attach, index) => {
        return (
          <li key={index}>
            <AttachReadOnly attach={attach} />
          </li>
        );
      })}
    </ul>
  );
};

export { AttachesReadOnly };
