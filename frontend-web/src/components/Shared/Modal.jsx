import React, { useState } from 'react';

const Modal = ({ title, icon,buttonStyle,children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className={buttonStyle} onClick={openModal}>
        {title}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-75"></div> {/* Capa de fondo oscuro */}
          <div className="absolute bg-white p-8 rounded shadow">
          <div className="flex items-center justify-center"> {/* Contenedor flex para alinear el icono y el título */}
            <span className="mr-1 mb-1.5">{icon}</span> {/* Agrega un margen derecho al icono */}
            <h2 className="text-lg font-bold mb-2 text-black text-center">{title}</h2>
          </div>
            <hr></hr>
            {children}
            <hr></hr>
            <button
              className="mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;