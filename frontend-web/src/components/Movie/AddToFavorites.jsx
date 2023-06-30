

import React, { useState } from 'react'
import { RiBookmark3Fill } from 'react-icons/ri'


const AddToFavorites = ({id}) => {

    const handleAddToFavorites = () => {
        // Paso 1: Leer el valor actual del array de favoritos del Local Storage
        const favoriteMoviesStr = localStorage.getItem("favoriteMovies");
        let favoriteMovies = [];
    
        if (favoriteMoviesStr) {
          // Si ya existe, parsear el valor a un array
          favoriteMovies = JSON.parse(favoriteMoviesStr);
        }
    
        // Paso 2: Agregar el nuevo ID al array de favoritos
        favoriteMovies.push(id);
    
        // Paso 3: Convertir el array actualizado a una cadena JSON y guardarla en el Local Storage
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
      };
      
  return (
    <button className='bg-yellow-400 flex items-center rounded-md' onClick={handleAddToFavorites}><RiBookmark3Fill></RiBookmark3Fill>Agregar a favoritos</button>
  )
}

export default AddToFavorites