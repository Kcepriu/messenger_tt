import { Tool } from "./Tool";

export class Line extends Tool {
  savedImage: string = "";
  startX: number = 0;
  startY: number = 0;

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
    this.startX = e.pageX - this.canvas.offsetLeft;
    this.startY = e.pageY - this.canvas.offsetTop;
    this.savedImage = this.canvas.toDataURL();
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

    const img = new Image();
    img.src = this.savedImage;

    img.onload = () => {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
}
