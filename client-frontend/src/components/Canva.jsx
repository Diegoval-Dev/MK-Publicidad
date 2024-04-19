import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const Canva = ({ backgroundImageUrl, uploadedImage, fabricText}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            height: 500,
            width: 500,
        });

        if (backgroundImageUrl) {
            fabric.Image.fromURL(backgroundImageUrl, function(img) {
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height
                });
            });
        }
        if (uploadedImage) {
            fabric.Image.fromURL(uploadedImage, (img) => {
                img.set({
                    left: (canvas.width - img.width * 0.5) / 2,
                    top: (canvas.height - img.height * 0.5) / 2,
                    scaleX: 0.5,
                    scaleY: 0.5
                });
                canvas.add(img);
                canvas.renderAll();
            });
        }
        
        if (fabricText) {
            canvas.add(fabricText);
        }

        return () => {
            canvas.dispose();
        };
    }, [backgroundImageUrl, uploadedImage, fabricText]);

    return (
        <canvas ref={canvasRef} />
    );
};

export default Canva;
