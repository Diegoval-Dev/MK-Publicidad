import { fabric } from 'fabric'; 
import { useEffect, useRef } from 'react';

const Canva = ({ backgroundImageUrl, uploadedImage, fabricText, fabricCanvasRef }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        height: 500,
        width: 500,
      });
  
      fabricCanvasRef.current = canvas;
  
      if (backgroundImageUrl) {
        fabric.Image.fromURL(backgroundImageUrl, function(img) {
          if (canvas) { // Comprueba si el canvas todavía existe
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height
            });
          }
        }, { crossOrigin: 'Anonymous' });
      }
      if (uploadedImage) {
        fabric.Image.fromURL(uploadedImage, (img) => {
          if (canvas) { // Comprueba si el canvas todavía existe
            img.set({
              left: (canvas.width - img.width * 0.5) / 2,
              top: (canvas.height - img.height * 0.5) / 2,
              scaleX: 0.5,
              scaleY: 0.5
            });
            canvas.add(img);
            canvas.renderAll();
          }
        }, { crossOrigin: 'Anonymous' });
      }
      
      if (fabricText) {
        canvas.add(fabricText);
      }
  
      return () => {
        canvas.dispose();
      };
    }, [backgroundImageUrl, uploadedImage, fabricText]);
  
    return (
      <div>
        <canvas ref={canvasRef} />
      </div>
    );
  };

export default Canva;