import { create } from "zustand";
import { type Tool } from "../tools/Tool";

interface IToolsStore {
  tool: Tool | null;

  setTool: (tool: Tool) => void;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setLineWidth: (width: number) => void;
}

export const useToolsStore = create<IToolsStore>((set) => ({
  tool: null,
  setTool: (tool: Tool) => set(() => ({ tool })),
  setFillColor: (color: string) =>
    set((state) => {
      const tool = state.tool;

      if (tool) {
        tool.fillColor = color;
      }

      return { tool };
    }),

  setStrokeColor: (color: string) =>
    set((state) => {
      const tool = state.tool;

      if (tool) {
        tool.strokeColor = color;
      }

      return { tool };
    }),

  setLineWidth: (width: number) =>
    set((state) => {
      const tool = state.tool;

      if (tool) {
        tool.lineWidth = width;
      }

      return { tool };
    }),
}));
