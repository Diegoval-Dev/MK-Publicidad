import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Define the Canva component
const Canva = ({ backgroundImageUrl, images, fabricTexts, fabricCanvasRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Dynamically import fabric.js only on the client-side
    const loadFabric = async () => {
      const fabricModule = await import('fabric'); // Import fabric.js dynamically
      const fabric = fabricModule.fabric;

      if (fabric) {
        const canvas = new fabric.Canvas(canvasRef.current, {
          height: 500,
          width: 500,
          backgroundColor: 'white',
        });

        fabricCanvasRef.current = canvas;

        // Set the background image if provided
        if (backgroundImageUrl) {
          fabric.Image.fromURL(
            backgroundImageUrl,
            function (img) {
              canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
              });
            },
            { crossOrigin: 'Anonymous' }
          );
        }

        // Cleanup: Destroy the canvas when the component unmounts
        return () => {
          fabricCanvasRef.current = null;
          canvas.dispose();
        };
      }
    };

    // Call the dynamic load function only once on mount
    loadFabric();
  }, [backgroundImageUrl, fabricCanvasRef]); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Second useEffect for loading images and texts after the canvas has been created
    const loadFabric = async () => {
      const fabricModule = await import('fabric');
      const fabric = fabricModule.fabric;
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const backgroundImage = canvas.backgroundImage;
      canvas.clear();
      if (backgroundImage) {
        canvas.setBackgroundImage(backgroundImage, canvas.renderAll.bind(canvas));
      }

      // Add images to the canvas
      images.forEach((image) => {
        fabric.Image.fromURL(
          image.src,
          (img) => {
            img.set({
              left: image.left,
              top: image.top,
              scaleX: image.scaleX,
              scaleY: image.scaleY,
            });
            canvas.add(img);
          },
          { crossOrigin: 'Anonymous' }
        );
      });

      // Add text objects to the canvas
      fabricTexts.forEach((text) => {
        canvas.add(text);
      });

      // Re-render the canvas
      canvas.renderAll();
    };

    loadFabric();
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
  fabricCanvasRef: PropTypes.object.isRequired,
};

// Export the component with dynamic loading and SSR disabled
export default dynamic(() => Promise.resolve(Canva), { ssr: false });
