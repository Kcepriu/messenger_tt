import { Tool } from "./Tool";

export class Eraser extends Tool {
  currentStrokeColor: string | CanvasGradient | CanvasPattern = "#000000";
  currentLineWidth: number = 2;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.restoreSavedValueTool();
  }

  saveCurrentValueTool() {
    if (!this.ctx) return;
    this.currentStrokeColor = this.ctx.strokeStyle;
    this.currentLineWidth = this.ctx.lineWidth;
  }

  restoreSavedValueTool() {
    if (!this.ctx) return;
    this.ctx.strokeStyle = this.currentStrokeColor;
    this.ctx.lineWidth = this.currentLineWidth;
  }

  mouseDownHandler(e: MouseEvent) {
    if (!this.ctx) return;
    this.saveCurrentValueTool();

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 10;

    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - this.canvas.offsetLeft,
      e.pageY - this.canvas.offsetTop
    );
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      this.draw(
        e.pageX - this.canvas.offsetLeft,
        e.pageY - this.canvas.offsetTop
      );
    }
  }

  draw(x: number, y: number) {
    if (!this.ctx) return;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
