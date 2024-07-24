import React, { useEffect, useState, useRef } from 'react';
import Banner from '../components/Banner';
import Canva from '../components/Canva';
import TextEditor from '../components/TextEditor';
import PropTypes from 'prop-types';
import ImageUploader from '../components/ImageUploader';
import NavigationButtons from '../components/NavigationButtons';
import useNavigate from '@hooks/useNavigate';
import { fabric } from 'fabric';

const CustomizationPage = () => {
  const [editorVisible, setEditorVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([{ text: '', font: 'Arial', fontSize: 16, color: '#000000', alignment: 'left' }]);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const { navigate, params } = useNavigate();
  const [screenshot, setScreenshot] = useState(null);
  const fabricCanvasRef = useRef(null);
  const [product, setProduct] = useState({});
  const [fabricTexts, setFabricTexts] = useState([]);
  const [fabricImage, setFabricImage] = useState(null);

  const takeScreenshot = () => {
    const dataUrl = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 0.8
    });
    setScreenshot(dataUrl);
  };

  const handleCustomizationClick = (e) => {
    e.preventDefault(); 
    takeScreenshot();
  };

  const addText = () => {
    setTexts([...texts, { text: '', font: 'Arial', fontSize: 16, color: '#000000', alignment: 'left' }]);
  };

  const removeText = (index) => {
    const updatedTexts = texts.filter((_, i) => i !== index);
    setTexts(updatedTexts);

    const updatedFabricTexts = fabricTexts.filter((_, i) => i !== index);
    setFabricTexts(updatedFabricTexts);

    // Remove text from canvas
    const canvas = fabricCanvasRef.current;
    const fabricText = fabricTexts[index];
    if (fabricText) {
      canvas.remove(fabricText);
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (screenshot) {
      console.log("Adding customization to cart")
      navigate(
        'quote', 
        { category: product.category,
          productId: product.id,
          screenshot: screenshot,
          color: color,
          size: size,
          quantity: quantity,
          description: description
        });
    }
  }, [screenshot]);

  useEffect(() => {
    const apiURL = `http://localhost:3000/user/products/${params.productId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Error al obtener producto:", response.statusText);
        }
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };
    fetchData();
  }, [params.productId]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;

    if (!canvas) return;

    fabricTexts.forEach((fabricText, index) => {
      const text = texts[index];
      if (fabricText) {
        fabricText.set({
          text: text.text,
          fontFamily: text.font,
          fill: text.color,
          fontSize: text.fontSize,
          textAlign: text.alignment,
          left: fabricText.left, // Mantener la posición
          top: fabricText.top   // Mantener la posición
        });
      } else {
        const newText = new fabric.IText(text.text, {
          left: 50,
          top: 50,
          fontFamily: text.font,
          fill: text.color,
          fontSize: text.fontSize,
          textAlign: text.alignment
        });
        canvas.add(newText);
        setFabricTexts(prevTexts => {
          const newTexts = [...prevTexts];
          newTexts[index] = newText;
          return newTexts;
        });
      }
    });

    canvas.renderAll();
    
    if (image) {
      if (fabricImage) {
        fabricImage.setSrc(image, () => {
          canvas.renderAll();
        });
      } else {
        fabric.Image.fromURL(image, img => {
          img.set({ left: 50, top: 50 });
          canvas.add(img);
          setFabricImage(img);
        });
      }
    }

  }, [image, texts, fabricTexts]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <Banner />
      <h1 className="text-3xl font-bold text-gray-800 mt-8">ID:{params.productId}</h1>
      <NavigationButtons 
        onClick={() => navigate('/home/catalogue', { category: product.category })}
      />
      <div className="flex justify-center items-start w-full max-w-4xl px-4 mt-8">
        <div className="flex-1">
          <Canva 
            backgroundImageUrl={product.image} 
            uploadedImage={image} 
            fabricTexts={fabricTexts}
            fabricCanvasRef={fabricCanvasRef}
          />
        </div>
        <div className="flex-1 ml-8 space-y-4">
          <button onClick={() => setEditorVisible(!editorVisible)} className="text-sm font-medium text-gray-700 p-2 border-b border-gray-300 w-full text-left">
            Diseño
          </button>
          {editorVisible && texts.map((textItem, index) => (
            <TextEditor
              key={index}
              index={index}
              text={textItem.text}
              setText={(text) => {
                const newTexts = [...texts];
                newTexts[index].text = text;
                setTexts(newTexts);
              }}
              font={textItem.font}
              setFont={(font) => {
                const newTexts = [...texts];
                newTexts[index].font = font;
                setTexts(newTexts);
              }}
              fontSize={textItem.fontSize}
              setFontSize={(fontSize) => {
                const newTexts = [...texts];
                newTexts[index].fontSize = fontSize;
                setTexts(newTexts);
              }}
              color={textItem.color}
              setColor={(color) => {
                const newTexts = [...texts];
                newTexts[index].color = color;
                setTexts(newTexts);
              }}
              alignment={textItem.alignment}
              setAlignment={(alignment) => {
                const newTexts = [...texts];
                newTexts[index].alignment = alignment;
                setTexts(newTexts);
              }}
              setFabricText={setFabricTexts}
              removeText={removeText}
            />
          ))}
          {editorVisible && (
            <button onClick={addText} className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-color-button hover:bg-color-button-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-button">
              Añadir Texto
            </button>
          )}
          {editorVisible && <ImageUploader setImage={setImage} />}
          <form className="bg-white shadow-md rounded px-4 pt-4 pb-2">
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
              <select id="color" name="color" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2" value={color} onChange={e => setColor(e.target.value)}>
                <option value="">Selecciona un color</option>
                <option value="color1">Color 1</option>
                <option value="color2">Color 2</option>
                <option value="color3">Color 3</option>
              </select>
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">Talla:</label>
              <select id="size" name="size" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2" value={size} onChange={e => setSize(e.target.value)}>
                <option value="">Selecciona una talla</option>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad:</label>
              <input type="number" id="quantity" name="quantity" min="1" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="additional-description" className="block text-sm font-medium text-gray-700">Descripción Adicional:</label>
              <textarea id="additional-description" name="additional-description" placeholder="Ingresa una descripción adicional" className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <button
              type="button"
              className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-color-button hover:bg-color-button-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color-button"
              onClick={handleCustomizationClick}
            >
              Solicitar Cotización
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CustomizationPage.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomizationPage;
