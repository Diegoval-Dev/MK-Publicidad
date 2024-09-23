import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const FabricCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Dynamically import fabric-pure-browser only on the client-side
    const loadFabric = async () => {
      const fabricModule = await import('fabric-pure-browser'); // Import fabric-pure-browser dynamically
      const fabric = fabricModule.fabric;

      console.log("Fabric module loaded:", fabric);

      // Ensure that `fabric.Canvas` is available after it's loaded
      if (fabric) {
        const canvas = new fabric.Canvas(canvasRef.current, {
          height: 900,
          width: 1800,
          backgroundColor: 'blue',
        });

        console.log("Canvas created with fabric-pure-browser:", canvas);

        // Add a text object to the canvas
        const text = new fabric.IText('Hello, Fabric.js (pure browser)!', {
          left: 100,
          top: 100,
          fontFamily: 'Arial',
          fill: 'white',
          fontSize: 50,
        });

        canvas.add(text); // Add the text to the canvas
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

  return <canvas id="fabricCanvas" ref={canvasRef} style={{ border: '1px solid black' }} />;
};

// Export the component with dynamic loading and SSR disabled
export default dynamic(() => Promise.resolve(FabricCanvas), { ssr: false });
