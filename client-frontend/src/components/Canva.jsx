import { fabric } from 'fabric'; 
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Canva = ({ backgroundImageUrl, images, fabricTexts, fabricCanvasRef }) => {
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

    // Add images to the canvas
    images.forEach((image) => {
      fabric.Image.fromURL(image.src, (img) => {
        img.set({
          left: image.left,
          top: image.top,
          scaleX: image.scaleX,
          scaleY: image.scaleY,
        });
        canvas.add(img);
      }, { crossOrigin: 'Anonymous' });
    });

    // Add texts to the canvas
    fabricTexts.forEach(text => {
      canvas.add(text);
    });

    canvas.renderAll();
  }, [images, fabricTexts, fabricCanvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

Canva.propTypes = {
  backgroundImageUrl: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      scaleX: PropTypes.number.isRequired,
      scaleY: PropTypes.number.isRequired,
    })
  ),
  fabricTexts: PropTypes.arrayOf(PropTypes.object),
  fabricCanvasRef: PropTypes.object,
};

export default Canva;
