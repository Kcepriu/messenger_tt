export const drawImageOnCanvas = (
  canvas: HTMLCanvasElement | null,
  dataUrl: string | undefined,
  clearLastElement: boolean = true
) => {
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  if (dataUrl) {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  } else if (clearLastElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};
