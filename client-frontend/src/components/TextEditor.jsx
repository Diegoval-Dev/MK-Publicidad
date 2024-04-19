import React, { useState } from 'react';

const TextEditor = ({ text, setText, font, setFont, fontSize, setFontSize, color, setColor, alignment, setAlignment, setFabricText }) => {
  
  const handleTextUpdate = () => {
    const newText = new fabric.IText(text, {
      left: 50,
      top: 50,
      fontFamily: font,
      fill: color,
      fontSize: parseInt(fontSize),
      textAlign: alignment,
    });
    setFabricText(newText);
  };
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-center space-x-2">
        <input
          type="text"
          className="flex-1 p-1 text-sm border border-gray-300 rounded shadow-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleTextUpdate}
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
          {/* Agregar más opciones de fuente aquí si lo necesitamos */}
        </select>
        <input
          type="number"
          className="p-1 text-sm border border-gray-300 rounded shadow-sm w-16"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="16"
        />
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

