import { FC, useState, ChangeEvent, useEffect } from "react";
import { ButtonAttach } from "../ButtonAttach/ButtonAttach";
import { ButtonSend } from "../ButtonSend/ButtonSend";
import { Attaches } from "../Attaches/Attaches";
import { useUsersStore, useChatsStore } from "../../stores";

const attaches: IAttach[] = [
  { id: 1, name: "file.txt", url: "" },
  { id: 2, name: "file_2.txt", url: "" },
];

const EditMessage: FC = () => {
  const currentUser = useUsersStore((store) => store.currentUser);
  const { addChat } = useChatsStore((store) => store);

  const [message, setMessage] = useState<string>("");

  const handlerSend = async () => {
    if (!message || !currentUser) return;

    addChat(currentUser.id, { message, attaches: [] });
    setMessage("");
  };

  const handlerChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    setMessage("");
  }, [currentUser]);

  return (
    <div
      className="w-full h-full p-4 border border-border_main rounded-lg
    flex gap-4  items-center"
    >
      <ButtonAttach />
      <div className="w-full h-full  flex flex-col gap-4">
        {attaches.length > 0 && (
          <Attaches attaches={attaches} withDelete={true} />
        )}
        <textarea
          placeholder="Input text message"
          className="grow p-4"
          value={message}
          onChange={handlerChangeText}
        />
      </div>

      <ButtonSend handlerSend={handlerSend} />
    </div>
  );
};

export { EditMessage };
