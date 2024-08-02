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
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [alignment, setAlignment] = useState('left');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const { navigate, params } = useNavigate();
  const [screenshot, setScreenshot] = useState(null);
  const fabricCanvasRef = useRef(null);
  const [fabricText, setFabricText] = useState(null); 
  const fabricTextObject = new fabric.IText(text, {
    left: 50,
    top: 50,
    fontFamily: font,
    fill: color,
    fontSize: fontSize,
    textAlign: alignment 
  });
  const [product, setProduct] = useState({});
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
          description: description,
          name: product.name,
          image: screenshot
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

    // Update or create the text object
    if (fabricText) {
      fabricText.set({
        text: text,
        fontFamily: font,
        fill: color,
        fontSize: fontSize,
        textAlign: alignment
      });
      canvas.renderAll();
    } else {
      const newText = new fabric.IText(text, {
        left: 50,
        top: 50,
        fontFamily: font,
        fill: color,
        fontSize: fontSize,
        textAlign: alignment
      });
      canvas.add(newText);
      setFabricText(newText);
    }

    // Update or create the image object
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

  }, [image, text, font, fontSize, color, alignment]);

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
            fabricText={fabricText}
            fabricCanvasRef={fabricCanvasRef}
          />
        </div>
        <div className="flex-1 ml-8 space-y-4">
          <button onClick={() => setEditorVisible(!editorVisible)} className="text-sm font-medium text-gray-700 p-2 border-b border-gray-300 w-full text-left">
            Diseño
          </button>
          {editorVisible && (
            <TextEditor
              text={text}
              setText={setText}
              font={font}
              setFont={setFont}
              fontSize={fontSize}
              setFontSize={setFontSize}
              color={color}
              setColor={setColor}
              alignment={alignment}
              setAlignment={setAlignment}
              setFabricText={setFabricText}
            />
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
