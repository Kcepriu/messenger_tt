import { FC, ChangeEvent, useState } from "react";
// import { Attaches } from "../Attaches/Attaches";
import { ButtonEditMessage } from "../ButtonEditMessage/ButtonEditMessage";
import { ButtonDeleteMessage } from "../ButtonDeleteMessage/ButtonDeleteMessage";
import { ButtonSaveMessage } from "../ButtonSaveMessage/ButtonSaveMessage";

interface IProps {
  chat: IChat;
}

const MessageMy: FC<IProps> = ({ chat }) => {
  // const { attaches } = chat;
  const [message, setMessage] = useState<string>(() => chat.message);

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  return (
    <>
      {chat.status === "send" && (
        <div className="flex w-full justify-end gap-4 group">
          <div className="hidden group-hover:block">
            <div className="flex gap-2">
              <ButtonDeleteMessage chat={chat} />
              <ButtonEditMessage chat={chat} />
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4 w-width_60p border border-1 border-border_main rounded-lg">
            {/* {attaches.length > 0 && <Attaches attaches={attaches} />} */}
            <p className="block w-full">{message}</p>
          </div>
        </div>
      )}
      {chat.status == "edit" && (
        <div className="flex w-full justify-end gap-4 items-center">
          <div className="p-4 flex flex-col gap-4 grow border border-1 border-border_main rounded-lg">
            {/* {attaches.length > 0 && (
              <Attaches attaches={attaches} withDelete={true} />
            )} */}
            <textarea
              placeholder="Input text message"
              className="grow p-4"
              value={message}
              onChange={handleChangeMessage}
            />
          </div>
          <ButtonSaveMessage chat={{ ...chat, message }} />
        </div>
      )}
    </>
  );
};

export { MessageMy };
