
export const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: { x: number; y: number; width: number; height: number }
  ): void => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
  
    // devicePixelRatio increases sharpness on retina devices
    const pixelRatio = window.devicePixelRatio || 1;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    // Set canvas size accounting for pixel ratio for better quality
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
  
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();
  
    // Crop x and y coordinates scaled to natural image dimensions
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
  
    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
  
    ctx.restore();
  };
  
  export default setCanvasPreview;
  