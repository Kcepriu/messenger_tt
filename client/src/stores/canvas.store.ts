import { create } from "zustand";
import { drawImageOnCanvas } from "../helpers/helpersCanvas";

interface ICanvasStore {
  canvas: HTMLCanvasElement | null;

  setCanvas: (canvas: HTMLCanvasElement) => void;
  undoList: string[];
  redoList: string[];
  pushToUndo: (data: string) => void;
  pushToRedo: (data: string) => void;
  undo: () => void;
  redo: () => void | undefined;
}

export const useCanvasStore = create<ICanvasStore>((set, get) => ({
  canvas: null,
  undoList: [],
  redoList: [],

  setCanvas: (canvas) => set(() => ({ canvas })),

  pushToUndo: (data: string) =>
    set((state) => ({ undoList: [...state.undoList, data] })),

  pushToRedo: (data: string) =>
    set((state) => ({ redoList: [...state.redoList, data] })),

  undo: () => {
    const { undoList, redoList, canvas } = get();
    if (!canvas) return;
    const dataUrl = undoList.pop();

    set(() => {
      if (dataUrl) redoList.push(canvas.toDataURL());
      return {
        undoList: [...undoList],
        redoList: [...redoList],
      };
    });

    drawImageOnCanvas(canvas, dataUrl);
  },
  redo: () => {
    const { redoList, undoList, canvas } = get();
    if (!canvas) return;

    const dataUrl = redoList.pop();

    set(() => {
      if (dataUrl) undoList.push(canvas.toDataURL());
      return {
        undoList: [...undoList],
        redoList: [...redoList],
      };
    });

    drawImageOnCanvas(canvas, dataUrl, false);
  },
}));
