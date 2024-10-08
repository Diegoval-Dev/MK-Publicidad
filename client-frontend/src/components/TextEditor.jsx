import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const TextEditor = ({ index, text, setText, font, setFont, fontSize, setFontSize, color, setColor, setFabricText, removeText }) => {

  useEffect(() => {
    const newText = new fabric.IText(text, {
      left: 50,
      top: 50,
      fontFamily: font,
      fill: color,
      fontSize: parseInt(fontSize),
    });
    setFabricText((prevTexts) => {
      const newTexts = [...prevTexts];
      newTexts[index] = newText;
      return newTexts;
    });
  }, [text, font, fontSize, color, index, setFabricText]);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-center space-x-2">
        <input
          type="text"
          className="flex-1 p-1 text-sm border border-gray-300 rounded shadow-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe algo aquí..."
        />
        <select
          className="p-1 text-sm border border-gray-300 rounded shadow-sm"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <input
          type="number"
          className="p-1 text-sm border border-gray-300 rounded shadow-sm w-16"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="16"
        />
       <button 
        onClick={() => removeText(index)} 
        className="text-sm bg-red-600 text-white hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out px-4 py-2 rounded-md"
      >
        Eliminar
      </button>


      </div>
      <div className="flex items-center justify-center space-x-2">
        <input
          type="color"
          className="w-10 p-1 border border-gray-300 rounded shadow-sm"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextEditor;
