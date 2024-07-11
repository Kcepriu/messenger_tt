export class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  mouseDown: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.destroyEvents();
  }

  destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }

  set fillColor(color: string) {
    if (!this.ctx) return;

    this.ctx.fillStyle = color;
  }

  set strokeColor(color: string) {
    if (!this.ctx) return;

    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    if (!this.ctx) return;

    this.ctx.lineWidth = width;
  }

  drawImage(dataUrl: string | undefined) {
    if (!this.ctx || !this.canvas) return;

    if (dataUrl) {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
