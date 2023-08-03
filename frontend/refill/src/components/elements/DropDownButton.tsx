import React, { useState } from "react";

type DropdownProps = {
  options: string[];
  onSelect: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-64 bg-white border-2 border-rf-4 rounded-md px-4 py-2 focus:border-indigo-500 hover:border-indigo-500"
        style={{ height: "100%" }}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <ul className="absolute w-64 mt-2 py-2 bg-white border rounded-md shadow-xl">
          {options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(option)}
                className="block px-4 py-1 text-gray-800 hover:bg-rf-1 hover:text-white w-full"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
