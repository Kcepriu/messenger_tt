import { FC, useState, ChangeEvent, useEffect, useRef } from "react";
import { ButtonAttach } from "../ButtonAttach/ButtonAttach";
import { ButtonSend } from "../ButtonSend/ButtonSend";
import { Attaches } from "../Attaches/Attaches";
import { useUsersStore, useChatsStore, useAuthStore } from "../../stores";
import { wsService } from "../../services/wsService";
import { v4 as uuidv4 } from "uuid";
import { httpServices } from "../../services/http.service";
import { showSuccessMessage } from "../../helpers/message";

const EditMessage: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { currentUser, increaseNumberUnreadMessages } = useUsersStore(
    (store) => store
  );

  const { addChat, onlyPushChat, setReceivedWSChat, receivedWSChat } =
    useChatsStore((store) => store);

  void addChat;
  const { user } = useAuthStore((store) => store);

  const [message, setMessage] = useState<string>("");

  const [attachFiles, setAttachFiles] = useState<IAttach[]>([]);

  const handlerSend = async () => {
    if (!message || !currentUser) return;

    const attaches = await handleSendFile();
    void attaches;

    // const chat = await addChat(currentUser.id, { message, attaches: [] });

    // if (!chat) return;

    // wsService.sendMessage(currentUser.id, JSON.stringify(chat));
    // setMessage("");
    // setAttachFiles([]);
  };

  const handleSendFile = async () => {
    if (attachFiles.length === 0) return [];

    const formData = new FormData();
    attachFiles.map((attach) => {
      formData.append("file", attach.file);
    });

    try {
      const data = await httpServices.uploadFile(formData);
      return data;
    } catch {
      return [];
    }
  };

  const handlerChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handlerAttachFile = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files[0]) return;
    const file = event.target.files[0];
    setAttachFiles((prev) => [...prev, { id: uuidv4(), file }]);
  };

  const handlerDeleteAttach = (id: string) => {
    setAttachFiles((prev) => prev.filter((element) => element.id !== id));
  };

  useEffect(() => {
    setMessage("");
  }, [currentUser]);

  useEffect(() => {
    if (!receivedWSChat) return;
    showSuccessMessage(receivedWSChat.message);
    if (!!currentUser && receivedWSChat.owner === currentUser.id) {
      onlyPushChat({ ...receivedWSChat });
    } else {
      increaseNumberUnreadMessages({ ...receivedWSChat }.owner);
    }
    setReceivedWSChat(null);
  }, [
    receivedWSChat,
    currentUser,
    onlyPushChat,
    increaseNumberUnreadMessages,
    setReceivedWSChat,
  ]);

  useEffect(() => {
    const connectWS = async (user: IAuthUser) => {
      wsService.userId = user.id;
      await wsService.connect();
      wsService.socket!.onmessage = (event) => {
        const chat = JSON.parse(event.data);
        setReceivedWSChat(chat);
      };
    };

    if (!user) return;
    connectWS(user);
  }, [user, setReceivedWSChat]);

  if (!currentUser) return null;

  return (
    <div
      className="w-full h-full p-4 border border-border_main rounded-lg
    flex gap-4  items-center"
    >
      <ButtonAttach handlerOnClick={handlerAttachFile} />

      <div className="w-full h-full  flex flex-col gap-4">
        {attachFiles.length > 0 && (
          <Attaches
            attaches={attachFiles}
            handlerDelete={handlerDeleteAttach}
          />
        )}
        <textarea
          placeholder="Input text message"
          className="grow p-4"
          value={message}
          onChange={handlerChangeText}
        />
      </div>

      <ButtonSend handlerSend={handlerSend} />

      <div>
        <form>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </form>
      </div>
    </div>
  );
};

export { EditMessage };
