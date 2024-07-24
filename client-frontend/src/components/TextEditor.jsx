import React, { useEffect } from 'react';

const TextEditor = ({ index, text, setText, font, setFont, fontSize, setFontSize, color, setColor, alignment, setAlignment, setFabricText, removeText }) => {

  useEffect(() => {
    const newText = new fabric.IText(text, {
      left: 50,
      top: 50,
      fontFamily: font,
      fill: color,
      fontSize: parseInt(fontSize),
      textAlign: alignment,
    });
    setFabricText(prevTexts => {
      const newTexts = [...prevTexts];
      newTexts[index] = newText;
      return newTexts;
    });
  }, [text, font, fontSize, color, alignment, setFabricText, index]);

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
        <button onClick={() => removeText(index)} className="text-sm text-red-500 hover:text-red-700">Eliminar</button>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <input
          type="color"
          className="w-10 p-1 border border-gray-300 rounded shadow-sm"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <select
          className="p-1 text-sm border border-gray-300 rounded shadow-sm"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
        >
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </div>
    </div>
  );
};

export default TextEditor;
