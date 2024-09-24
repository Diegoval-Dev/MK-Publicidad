import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const FabricCanvas = ({ backgroundImageUrl, images, fabricTexts, fabricCanvasRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Dynamically import fabric-pure-browser only on the client-side
    const loadFabric = async () => {
      const fabricModule = await import('fabric-pure-browser'); // Import fabric-pure-browser dynamically
      const fabric = fabricModule.fabric;
      if (fabric) {
        const canvas = new fabric.Canvas(canvasRef.current, {
          height: 500,
          width: 500,
          backgroundColor: 'white',
        });

        console.log("Canvas created with fabric-pure-browser:", canvas);

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

        canvas.renderAll(); // Ensure everything is rendered

        // Clean up canvas on component unmount
        return () => {
          canvas.dispose();
        };
      }
    };

    // Call the dynamic load function
    loadFabric();
  }, []);

  useEffect(() => {
    // Second useEffect for loading images and texts after the canvas has been created
    const loadFabric = async () => {
      const fabricModule = await import('fabric-pure-browser');
      const fabric = fabricModule.fabric;
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const backgroundImage = canvas.backgroundImage;
      canvas.clear();
      if (backgroundImage) {
        fabric.Image.fromURL(
          backgroundImage.src,
          function (img) {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height,
            });
          },
          { crossOrigin: 'Anonymous' }
        );
      }

      // Load images
      images.forEach((image) => {
        fabric.Image.fromURL(
          image.src,
          function (img) {
            canvas.add(img);
          },
          { crossOrigin: 'Anonymous' }
        );
      });

      // Load texts
      fabricTexts.forEach((text) => {
        const fabricText = new fabric.Text(text.text, {
          left: text.left,
          top: text.top,
          fill: text.fill,
        });
        canvas.add(fabricText);
      });

      canvas.renderAll(); // Ensure everything is rendered
    };

    // Call the dynamic load function
    loadFabric();
  }, [images, fabricTexts]); 

  return <canvas id="fabricCanvas" ref={canvasRef} style={{ border: '1px solid black' }} />;
};

// Export the component with dynamic loading and SSR disabled
export default dynamic(() => Promise.resolve(FabricCanvas), { ssr: false });