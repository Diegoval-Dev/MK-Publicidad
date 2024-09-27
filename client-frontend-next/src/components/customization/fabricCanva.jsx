import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric-pure-browser';

const FabricCanvas = React.memo(({ backgroundImageUrl, images, texts, fabricCanvasRef, onTextDragEnd, onImageDragEnd }) => {
  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 500,
      backgroundColor: 'white',
    });

    canvasInstanceRef.current = canvas;
    if (fabricCanvasRef) {
      fabricCanvasRef.current = canvas;
    }

    // Manejar eventos de modificación si es necesario
    canvas.on('object:modified', (e) => {
      const obj = e.target;
      if (obj.type === 'text' && onTextDragEnd) {
        const index = texts.findIndex((text) => text.id === obj.id);
        if (index !== -1) {
          onTextDragEnd(index, obj.left, obj.top);
        }
      } else if (obj.type === 'image' && onImageDragEnd) {
        const index = images.findIndex((image) => image.id === obj.id);
        if (index !== -1) {
          onImageDragEnd(index, obj.left, obj.top);
        }
      }
    });

    console.log('FabricCanvas mounted');

    return () => {
      console.log('FabricCanvas unmounted');
      canvas.dispose();
      canvasInstanceRef.current = null;
      if (fabricCanvasRef) {
        fabricCanvasRef.current = null;
      }
    };
  }, []); // Ejecutar solo al montar

  // Efecto para actualizar la imagen de fondo
  useEffect(() => {
    const canvas = canvasInstanceRef.current;
    if (!canvas || !backgroundImageUrl) return;

    let isMounted = true;

    fabric.Image.fromURL(
      backgroundImageUrl,
      (img) => {
        if (!isMounted) return; // Verifica si el componente sigue montado
        canvas.setBackgroundImage(
          img,
          canvas.renderAll.bind(canvas),
          {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
            crossOrigin: 'Anonymous',
          }
        );
      },
      { crossOrigin: 'Anonymous' }
    );

    return () => {
      isMounted = false;
    };
  }, [backgroundImageUrl]);

  // Efecto para actualizar imágenes y textos
  useEffect(() => {
    const canvas = canvasInstanceRef.current;
    if (!canvas) return;

    let isMounted = true;

    // Limpiar los objetos antes de agregar nuevos
    canvas.getObjects().forEach((obj) => {
      if (obj !== canvas.backgroundImage) {
        canvas.remove(obj);
      }
    });

    // Agregar imágenes
    images.forEach((image) => {
      fabric.Image.fromURL(
        image.src,
        (img) => {
          if (!isMounted) return; // Verifica si el componente sigue montado
          img.set({
            left: image.x || 50,
            top: image.y || 50,
            scaleX: image.scaleX || 0.5,
            scaleY: image.scaleY || 0.5,
            id: image.id,
          });
          canvas.add(img);
          canvas.renderAll();
        },
        { crossOrigin: 'Anonymous' }
      );
    });

    // Agregar textos
    texts.forEach((text) => {
      const fabricText = new fabric.Text(text.text, {
        left: text.x || 50,
        top: text.y || 50,
        fill: text.fill || '#000000',
        fontFamily: text.fontFamily || 'Arial',
        fontSize: text.fontSize || 16,
        id: text.id,
      });
      canvas.add(fabricText);
    });

    canvas.renderAll();

    return () => {
      isMounted = false;
    };
  }, [images, texts]);

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />;
});

export default FabricCanvas;
