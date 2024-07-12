import { FC } from "react";
import { Attach } from "../Attach/Attach";

interface IProps {
  attaches: IAttach[];
}

const Attaches: FC<IProps> = ({ attaches }) => {
  return (
    <ul className="w-full flex gap-4">
      {attaches.map((attach) => {
        return (
          <li key={attach.id}>
            <Attach attach={attach} />
          </li>
        );
      })}
    </ul>
  );
};

export { Attaches };
