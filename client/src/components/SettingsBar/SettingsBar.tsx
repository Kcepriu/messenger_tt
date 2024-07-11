import { FC, useEffect } from "react";
import { useToolsStore } from "../../stores";

const defaultFillColor = "#ffffff";
const defaultStrokeColor = "#000000";
const defaultLineThickness = 2;

const SettingsBar: FC = () => {
  const { setLineWidth, setStrokeColor, setFillColor } = useToolsStore(
    (state) => state
  );

  useEffect(() => {
    setStrokeColor(defaultStrokeColor);
    setFillColor(defaultFillColor);
    setLineWidth(defaultLineThickness);
  }, [setStrokeColor, setFillColor, setLineWidth]);

  return (
    <div className="flex justify-start items-center py-2 px-2 shadow-md">
      <label htmlFor="lineThickness">Товщина лінії</label>
      <input
        type="number"
        id="lineThickness"
        name="lineThickness"
        className="ml-4 p-1 border border-gray-500 max-w-20 text-end"
        min="1"
        max="10"
        defaultValue={defaultLineThickness}
        onChange={(e) => setLineWidth(Number(e.target.value))}
      />

      <label htmlFor="strokeColor" className="ml-6">
        Колір обводки
      </label>
      <input
        type="color"
        name="strokeColor"
        id="strokeColor"
        defaultValue={defaultStrokeColor}
        className="ml-4  border-gray-500 max-w-20 "
        onChange={(e) => setStrokeColor(e.target.value)}
      />

      <label htmlFor="fillColor" className="ml-6">
        Колір заповнення
      </label>
      <input
        type="color"
        name="fillColor"
        id="fillColor"
        defaultValue={defaultFillColor}
        className="ml-4  border-gray-500 max-w-20 "
        onChange={(e) => setFillColor(e.target.value)}
      />
    </div>
  );
};

export default SettingsBar;
