import { FC, useRef, useEffect } from "react";
import { useCanvasStore, useToolsStore } from "../../stores";
import { Brush } from "../../tools/Brush";

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCanvas, pushToUndo } = useCanvasStore((store) => store);

  const setTool = useToolsStore((store) => store.setTool);

  const handlerMouseDown = () => {
    if (!canvasRef.current) return;
    pushToUndo(canvasRef.current.toDataURL());
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    setCanvas(canvasRef.current);
    setTool(new Brush(canvasRef.current));
  }, [setCanvas, setTool]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        className="outline outline-1 outline-red-400"
        onMouseDown={handlerMouseDown}
      />
    </div>
  );
};

export default Canvas;
