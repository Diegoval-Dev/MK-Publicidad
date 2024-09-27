'use client';

import React from 'react';

const TextEditor = ({ index, textItem, setTextItem, removeText }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextItem({ ...textItem, [name]: value });
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-center space-x-2">
        <input
          type="text"
          name="text"
          className="flex-1 p-1 text-sm border border-gray-300 rounded shadow-sm"
          value={textItem.text}
          onChange={handleChange}
          placeholder="Escribe algo aquí..."
        />
        <select
          name="fontFamily"
          className="p-1 text-sm border border-gray-300 rounded shadow-sm"
          value={textItem.fontFamily}
          onChange={handleChange}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <input
          type="number"
          name="fontSize"
          className="p-1 text-sm border border-gray-300 rounded shadow-sm w-16"
          value={textItem.fontSize}
          onChange={handleChange}
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
          name="fill"
          className="w-10 p-1 border border-gray-300 rounded shadow-sm"
          value={textItem.fill}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TextEditor;
