import { FC } from "react";
import { Attach } from "../Attach/Attach";

interface IProps {
  attaches: IAttach[];
  withDelete?: boolean;
}

const Attaches: FC<IProps> = ({ attaches, withDelete = false }) => {
  const handlerDelete = (attach: IAttach) => {
    attaches = attaches.filter((element) => element.id !== attach.id);
    console.log("attaches", attaches);
  };

  return (
    <ul className="w-full flex gap-4">
      {attaches.map((attach) => {
        return (
          <li key={attach.id}>
            <Attach
              attach={attach}
              withDelete={withDelete}
              handlerDelete={() => handlerDelete(attach)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export { Attaches };
