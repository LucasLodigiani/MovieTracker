import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className=""
        onClick={toggleDropdown}
      >
        Mostrar Menú
      </button>

      {isOpen && (
        <div className="absolute mt-0.5 w-48 bg-white rounded-md shadow-lg">
          {/* Contenido del menú desplegable */}
          <a href="test" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            Opción 1
          </a>
          <a href="test" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            Opción 2
          </a>
          <a href="test" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            Opción 3
          </a>
        </div>
      )}
    </>
  );
};

export default Dropdown;