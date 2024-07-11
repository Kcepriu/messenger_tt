import { FC } from "react";
import { FaRegCircle, FaRegSave } from "react-icons/fa";
import { FaPencil, FaRegSquare, FaEraser } from "react-icons/fa6";
import { PiLineSegmentDuotone } from "react-icons/pi";
import { GrUndo, GrRedo } from "react-icons/gr";
import { ButtonToolBar } from "../ButtonToolBar/ButtonToolBar";
import { useCanvasStore, useToolsStore } from "../../stores";
import { Rec, Brush, Circle, Eraser, Line } from "../../tools";

const ToolsBar: FC = () => {
  const { canvas, undo, redo } = useCanvasStore((store) => store);
  const { tool, setTool } = useToolsStore((store) => store);

  const handleClick = () => {
    console.log("TEst 123");
  };

  return (
    <div className="flex justify-between py-2 px-2 shadow-md">
      <div className="flex gap-2 items-center ">
        <ButtonToolBar
          size="big"
          icon={FaPencil}
          checked={tool instanceof Brush}
          onClick={() => {
            !!canvas && setTool(new Brush(canvas));
          }}
        />
        <ButtonToolBar
          size="big"
          icon={FaRegSquare}
          checked={tool instanceof Rec}
          onClick={() => {
            !!canvas && setTool(new Rec(canvas));
          }}
        />

        <ButtonToolBar
          size="big"
          icon={FaRegCircle}
          checked={tool instanceof Circle}
          onClick={() => {
            !!canvas && setTool(new Circle(canvas));
          }}
        />
        <ButtonToolBar
          size="big"
          icon={FaEraser}
          checked={tool instanceof Eraser}
          onClick={() => {
            !!canvas && setTool(new Eraser(canvas));
          }}
        />

        <ButtonToolBar
          size="big"
          icon={PiLineSegmentDuotone}
          checked={tool instanceof Line}
          onClick={() => {
            !!canvas && setTool(new Line(canvas));
          }}
        />
      </div>

      <div className="flex gap-2 items-center py-2 px-2">
        <ButtonToolBar size="big" icon={GrUndo} onClick={() => undo()} />
        <ButtonToolBar size="big" icon={GrRedo} onClick={() => redo()} />
        <ButtonToolBar size="big" icon={FaRegSave} onClick={handleClick} />
      </div>
    </div>
  );
};

export default ToolsBar;
