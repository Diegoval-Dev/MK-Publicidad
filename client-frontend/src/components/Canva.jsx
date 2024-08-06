import { fabric } from 'fabric'; 
import { useEffect, useRef } from 'react';

const Canva = ({ backgroundImageUrl, uploadedImage, fabricTexts, fabricCanvasRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 500,
    });

    fabricCanvasRef.current = canvas;

    if (backgroundImageUrl) {
      fabric.Image.fromURL(backgroundImageUrl, function(img) {
        if (canvas) {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height
          });
        }
      }, { crossOrigin: 'Anonymous' });
    }

    return () => {
      canvas.dispose();
    };
  }, [backgroundImageUrl, fabricCanvasRef]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Clear all objects except the background image
    const backgroundImage = canvas.backgroundImage;
    canvas.clear();
    if (backgroundImage) {
      canvas.setBackgroundImage(backgroundImage, canvas.renderAll.bind(canvas));
    }

    if (uploadedImage) {
      fabric.Image.fromURL(uploadedImage, img => {
        img.set({
          left: (canvas.width - img.width * 0.5) / 2,
          top: (canvas.height - img.height * 0.5) / 2,
          scaleX: 0.5,
          scaleY: 0.5
        });
        canvas.add(img);
        canvas.renderAll();
      }, { crossOrigin: 'Anonymous' });
    }

    if (fabricTexts) {
      fabricTexts.forEach(text => {
        canvas.add(text);
      });
      canvas.renderAll();
    }
  }, [uploadedImage, fabricTexts, fabricCanvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canva;
