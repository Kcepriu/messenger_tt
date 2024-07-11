import { Tool } from "./Tool";

export class Brush extends Tool {
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
  }

  mouseDownHandler(e: MouseEvent) {
    if (!this.ctx) return;
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
