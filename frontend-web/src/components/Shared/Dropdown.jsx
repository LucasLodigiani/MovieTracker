import React, { useState } from "react";

const Dropdown = ({ icon, buttonText, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className="flex items-center" onClick={toggleDropdown}>
        {buttonText}
        {icon}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 transform translate-x-5 bg-white rounded-md shadow-lg">
          {children}          
        </div>
      )}
    </div>
  );
};

export default Dropdown;