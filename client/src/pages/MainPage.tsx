import { FC } from "react";
import { useParams } from "react-router-dom";
import SettingsBar from "../components/SettingsBar/SettingsBar";
import ToolsBar from "../components/ToolsBar/ToolsBar";
import Canvas from "../components/Canvas/Canvas";
import { wsService } from "../services/wsService";

const MainPage: FC = () => {
  const { idSession } = useParams();

  const handlerConnect = () => {
    const message = {
      id: idSession,
      userName: "Serhi",
      message: "Test message",
    };

    wsService.sendMessage(JSON.stringify(message));
  };

  return (
    <div className="flex flex-col h-lvh">
      <ToolsBar />
      <SettingsBar />
      <button onClick={handlerConnect}>Connect WebSockets</button>
      <div className="flex-grow mx-auto mt-5">
        <Canvas />
      </div>
    </div>
  );
};

export { MainPage };
