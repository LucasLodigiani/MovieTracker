
import React from 'react'

//Recibe la callback de lo que hara el boton como parametro.
const ButtonLoading = ({isLoading, onClick, buttonText}) => {
  return (
    <>
        {isLoading ? (
                <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled
                >
                Cargando...
                </button>
            ) : (
                <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={onClick}
                >
                {buttonText}
                </button>
            )}
    </>
  )
}

export default ButtonLoading