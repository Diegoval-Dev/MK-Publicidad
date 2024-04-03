import React, { useState } from 'react';

function FilterDropDown({ namefilter, optionsfilter }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    setSelectedOptions(prevSelectedOptions => {
      if (isChecked) {
        return [...prevSelectedOptions, optionValue];
      } else {
        return prevSelectedOptions.filter(option => option !== optionValue);
      }
    });
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between mb-5">
        <span className="font-bold">{namefilter}</span>
        <button className="border-none bg-none cursor-pointer text-xl">
          +
        </button>
      </div>
      <div className="dropdown-content flex flex-col justify-center items-start" >
        {optionsfilter.map((option, index) => (
          <div className="checkbox-option" key={index}>
            <input
              type="checkbox"
              id={option} 
              name={` option${index} `}
              value={option}
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes(option)} 
            />
            <label className='ml-2' htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterDropDown;