import { FC } from "react";
import { Attach } from "../Attach/Attach";

interface IProps {
  attaches: IAttach[];
  handlerDelete: (id: string) => void;
}

const Attaches: FC<IProps> = ({ attaches, handlerDelete }) => {
  return (
    <ul className="w-full flex gap-4">
      {attaches.map((attach) => {
        return (
          <li key={attach.id}>
            <Attach
              attach={attach}
              handlerDelete={() => handlerDelete(attach.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export { Attaches };
