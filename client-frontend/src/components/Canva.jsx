import { fabric } from 'fabric'; 
import { useEffect, useRef } from 'react';

const Canva = ({ backgroundImageUrl, uploadedImages, fabricTexts, fabricCanvasRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas;
    if (canvasRef.current) {
      canvas = new fabric.Canvas(canvasRef.current, {
        height: 500,
        width: 500,
      });

      if (fabricCanvasRef) {
        fabricCanvasRef.current = canvas; // Asegurarse de asignar correctamente el ref
      }

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
    }

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [backgroundImageUrl, fabricCanvasRef]);

  useEffect(() => {
    const canvas = fabricCanvasRef?.current;
    if (!canvas) return;

    // Limpiar canvas pero mantener la imagen de fondo
    const backgroundImage = canvas.backgroundImage;
    canvas.clear();
    if (backgroundImage) {
      canvas.setBackgroundImage(backgroundImage, canvas.renderAll.bind(canvas));
    }

<<<<<<< HEAD
    // Agregar imágenes cargadas al canvas y permitir su manipulación
    images.forEach((image, index) => {
      fabric.Image.fromURL(image.src, img => {
        img.set({
          left: (canvas.width - img.width * 0.5) / 2,
          top: (canvas.height - img.height * 0.5) / 2,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true,
          hasControls: true,
          hasBorders: true,
=======
    uploadedImages.forEach(image => {
      fabric.Image.fromURL(image.src, img => {
        img.set({
          left: image.left,
          top: image.top,
          scaleX: image.scaleX,
          scaleY: image.scaleY
>>>>>>> customisation
        });
        canvas.add(img);
        canvas.renderAll();
      }, { crossOrigin: 'Anonymous' });
    });

<<<<<<< HEAD
    // Agregar textos al canvas
    fabricTexts.forEach(text => {
      canvas.add(text);
    });

    canvas.renderAll();
  }, [images, fabricTexts, fabricCanvasRef]);
=======
    if (fabricTexts) {
      fabricTexts.forEach(text => {
        canvas.add(text);
      });
      canvas.renderAll();
    }
  }, [uploadedImages, fabricTexts, fabricCanvasRef]);
>>>>>>> customisation

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canva;
