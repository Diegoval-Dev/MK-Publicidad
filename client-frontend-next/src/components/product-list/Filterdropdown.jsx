import PropTypes from 'prop-types';
import { useState } from 'react';

function FilterDropDown({ namefilter, optionsfilter, selectedOptions, onChange}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleDropState = () => {
    setIsVisible(!isVisible)
  }; 

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let newSelectedOptions;

    if (checked) {
      newSelectedOptions = [...selectedOptions, value];
    } else {
      newSelectedOptions = selectedOptions.filter((option) => option !== value);
    }

    onChange(newSelectedOptions);
  };


  return (
    <div className="pb select-none">
      <div className="flex justify-between mb-5" onClick={handleDropState}>
        <span className="font-bold">{namefilter}</span>
        <button className="border-none bg-none cursor-pointer text-xl">
          {isVisible ? '-' : '+'}
        </button>
      </div>
      {isVisible && (
        <div className="dropdown-content flex flex-col justify-center items-start" >
        {optionsfilter.map((option, index) => (
          <div className="checkbox-option" key={index}>
            <input
              type="checkbox"
              id={option} 
              name={` option${index} `}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
            />
            <label className='ml-2' htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

FilterDropDown.propTypes = {
  namefilter: PropTypes.string.isRequired,
  optionsfilter: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterDropDown;