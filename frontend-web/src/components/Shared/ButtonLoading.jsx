import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

// Recibe la callback de lo que hará el botón como parámetro.
const ButtonLoading = ({ isLoading, onClick, buttonText }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {isLoading ? (
        <button
          className={`${
            theme === 'light' ? 'bg-gray-500' : 'bg-blue-600'
          } hover:bg-gray-700 text-white font-bold py-2 px-4 rounded`}
          type='submit'
          disabled
        >
          Cargando...
        </button>
      ) : (
        <button
          className={`${
            theme === 'light' ? 'bg-pink-950 text-white hover:bg-rose-700' : 'bg-blue-600 text-white hover:bg-blue-700'
          }  font-bold py-2 px-4 rounded-xl`}
          type='submit'
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

export default ButtonLoading;
