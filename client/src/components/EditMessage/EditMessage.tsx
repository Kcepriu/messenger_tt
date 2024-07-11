import { FC } from "react";

const EditMessage: FC = () => {
  return (
    <div
      className="w-full h-full p-4 border border-border_main rounded-lg
    flex gap-4"
    >
      <button>Attach file</button>
      <input placeholder="Input text message" className="h-full grow" />
      <button>Send message</button>
    </div>
  );
};

export { EditMessage };
