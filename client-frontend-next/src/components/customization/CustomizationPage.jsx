'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NavigationButtons from '@components/utils/NavigationButtons';
import { CustomButton, SubtleButton } from '@styles/styled';
import { fetchProductById } from '@api/products';

import FabricCanvas from './FabricCanva';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';

const CustomizationPage = () => {
  const [editorVisible, setEditorVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const fabricCanvasRef = useRef(null);
  const router = useRouter();
  const { nombre_categoria, productId } = useParams();
  const memoizedImages = useMemo(() => images, [images]);
  const memoizedTexts = useMemo(() => texts, [texts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error al cargar producto:', error);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  const takeScreenshot = () => {
    if (fabricCanvasRef.current) {
      const dataUrl = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 0.8,
      });
      return dataUrl;
    }
    return null;
  };

  const handleCustomizationClick = (e) => {
    e.preventDefault();
    
    if (quantity < 1) {
      setErrorMessage('La cantidad de artículos debe ser mayor o igual a 1.');
      return;
    }

    setErrorMessage('');

    const screenshotData = takeScreenshot();
    const customizationData = {
      category: product.nombre_categoria,
      productId: product.product_id,
      screenshot: screenshotData,
      color,
      size,
      quantity,
      description,
      name: product.product_name,
    };
    localStorage.setItem('customizationData', JSON.stringify(customizationData));

    router.push('/quote');
  };

  const addText = () => {
    setTexts([
      ...texts,
      {
        id: Date.now(),
        text: '',
        fontFamily: 'Arial',
        fontSize: 16,
        fill: '#000000',
        x: 50,
        y: 50,
      },
    ]);
  };

  const removeText = (index) => {
    setTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));
  };

  const handleTextDragEnd = (index, x, y) => {
    const newTexts = [...texts];
    newTexts[index] = { ...newTexts[index], x, y };
    setTexts(newTexts);
  };

  const handleImageDragEnd = (index, x, y) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], x, y };
    setImages(newImages);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="w-full text-center py-4">
        <h1 className="text-4xl font-semibold text-gray-900">{product.product_name}</h1>
        <div className="mt-2 mx-auto w-80 border-b-2 border-green-600"></div>
      </div>

      <div className="container flex justify-between items-center p-4">
        <NavigationButtons className="ml-4" />
      </div>

      <div className="flex justify-center items-start w-full max-w-4xl px-4 mt-8">
        <div className="flex-1">
          <FabricCanvas
            backgroundImageUrl={product.image_url}
            images={memoizedImages}
            texts={memoizedTexts}
            fabricCanvasRef={fabricCanvasRef}
            onTextDragEnd={handleTextDragEnd}
            onImageDragEnd={handleImageDragEnd}
          />
        </div>
        <div className="flex-1 ml-8 space-y-4">
          <button
            onClick={() => setEditorVisible(!editorVisible)}
            className="text-sm font-medium text-gray-700 p-3 bg-[#f9f9f7] hover:bg-[#f5f5f0] border border-[#eae8dc] rounded-md w-full text-center shadow-sm"
          >
            Diseño
          </button>

          {editorVisible &&
            texts.map((textItem, index) => (
              <TextEditor
                key={index}
                index={index}
                textItem={textItem}
                setTextItem={(updatedTextItem) => {
                  const newTexts = [...texts];
                  newTexts[index] = updatedTextItem;
                  setTexts(newTexts);
                }}
                removeText={() => removeText(index)}
              />
            ))}
          {editorVisible && (
            <SubtleButton
              onClick={addText}
              className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Añadir Texto
            </SubtleButton>
          )}
          {editorVisible && <ImageUploader images={images} setImages={setImages} />}
          <form className="bg-white shadow-md rounded px-4 pt-4 pb-2">
            <div className="form-group">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Cantidad:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                placeholder="Ingresa la cantidad"
                className="form-field"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>

            {product.colors && (
              <div className="form-group">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                  Color:
                </label>
                {color && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{
                        backgroundColor: product.colors.find(
                          (col) => col.color_name === color
                        )?.hex_code,
                      }}
                    ></span>
                    <span>{color}</span>
                  </div>
                )}
                <select
                  id="color"
                  name="color"
                  className="form-field"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Selecciona un color</option>
                  {product.colors.map((color) => (
                    <option key={color.color_name} value={color.color_name}>
                      {color.color_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="additional-description" className="block text-sm font-medium text-gray-700">
                Descripción Adicional:
              </label>
              <textarea
                id="additional-description"
                name="additional-description"
                placeholder="Ingresa una descripción adicional"
                className="form-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <CustomButton type="button" onClick={handleCustomizationClick}>
              Solicitar Cotización
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;
