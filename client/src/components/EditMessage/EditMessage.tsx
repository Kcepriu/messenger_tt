import { FC } from "react";
import { ButtonAttach } from "../ButtonAttach/ButtonAttach";
import { ButtonSend } from "../ButtonSend/ButtonSend";
import { Attaches } from "../Attaches/Attaches";

const attaches: IAttach[] = [
  { id: 1, name: "file.txt", url: "" },
  { id: 2, name: "file_2.txt", url: "" },
];

const EditMessage: FC = () => {
  return (
    <div
      className="w-full h-full p-4 border border-border_main rounded-lg
    flex gap-4  items-center"
    >
      <ButtonAttach />
      <div className="w-full h-full  flex flex-col gap-4">
        {attaches.length > 0 && <Attaches attaches={attaches} />}
        <textarea placeholder="Input text message" className=" grow p-4" />
      </div>

      <ButtonSend />
    </div>
  );
};

export { EditMessage };
