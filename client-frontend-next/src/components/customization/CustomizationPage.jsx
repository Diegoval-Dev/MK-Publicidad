'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useParams } from 'next/navigation';
import NavigationButtons from '@components/utils/NavigationButtons';
import { CustomButton, SubtleButton } from '@styles/styled';
import { fetchProductById } from '@api/products';

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

  const Canva = dynamic(() => import('./Canva'), { ssr: false });
  const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });
  const ImageUploader = dynamic(() => import('./ImageUploader'), { ssr: false });
  const FabricCanvas = dynamic(() => import('./FabricCanva'), { ssr: false });
  const stageRef = useRef(null);

  const router = useRouter();
  const { nombre_categoria, productId } = useParams();

  const takeScreenshot = () => {
    const dataUrl = stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 0.8,
    });
    return dataUrl;
  };

  const handleCustomizationClick = (e) => {
    e.preventDefault();
    const screenshotData = takeScreenshot();

    const customizationData = {
      category: product.idcategoria,
      productId: product.id_producto,
      screenshot: screenshotData,
      color,
      size,
      quantity,
      description,
      name: product.nombre_producto,
    };
    localStorage.setItem('customizationData', JSON.stringify(customizationData));

    router.push('/quote');
  };

  const addText = () => {
    setTexts([
      ...texts,
      {
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Sección del título */}
      <div className="w-full text-center py-4">
        <h1 className="text-4xl font-semibold text-gray-900">{product.nombre_producto}</h1>
        <div className="mt-2 mx-auto w-80 border-b-2 border-green-600"></div>
      </div>

      <div className="container flex justify-between items-center p-4">
        <NavigationButtons
          onClick={() => router.push(`/categorias/${nombre_categoria}`)}
          className="ml-4"
        />
      </div>

      <div className="flex justify-center items-start w-full max-w-4xl px-4 mt-8">
        <div className="flex-1">
          {/* <Canva
            backgroundImageUrl={product.url_imagen}
            images={images}
            texts={texts}
            stageRef={stageRef}
            onTextDragEnd={handleTextDragEnd}
            onImageDragEnd={handleImageDragEnd}
          /> */}
          <FabricCanvas />

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
          {editorVisible && (
            <ImageUploader
              images={images}
              setImages={setImages}
            />
          )}
          <form className="bg-white shadow-md rounded px-4 pt-4 pb-2">
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color:
              </label>
              <select
                id="color"
                name="color"
                className="mt-1 block w-full border border-gray-300 rounded shadow-sm p-2"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Selecciona un color</option>
                <option value="color1">Color 1</option>
                <option value="color2">Color 2</option>
                <option value="color3">Color 3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                Talla:
              </label>
              <select
                id="size"
                name="size"
                className="form-field"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Selecciona una talla</option>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Cantidad:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                className="form-field"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="additional-description"
                className="block text-sm font-medium text-gray-700"
              >
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
