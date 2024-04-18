import React, { useState } from 'react';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [alignment, setAlignment] = useState('left');
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Texto"
        />
        <select
          className="p-2 border border-gray-300 rounded shadow-sm"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <input
          type="number"
          className="w-20 p-2 border border-gray-300 rounded shadow-sm"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Tamaño"
        />
        <input
          type="color"
          className="w-20 p-2 border border-gray-300 rounded shadow-sm"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded shadow-sm"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
        >
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </div>
      <div>
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-gray-500
          file:rounded file:border-0
          file:py-2 file:px-4
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
        />
        {image && (
          <img src={image} alt="Vista previa" className="mt-2 rounded" />
        )}
      </div>
    </div>
  );
};

export default TextEditor;


