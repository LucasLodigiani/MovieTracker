import React, { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';
import Alert from '../Shared/Alert';
import { MdMovieFilter } from 'react-icons/md';
import useGetFavorites from '../../hooks/movies/useGetFavorites';
import { base_url } from '../../utils/Config';
import { HiOutlineMinusSm } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites, isFavoritesLoading, favoritesError] = useGetFavorites(JSON.parse(localStorage.getItem("favoriteMovies")));

  const handleMovieDelete = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    const updatedFavoriteIds = updatedFavorites.map((favorite) => favorite.id);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavoriteIds));
  };

  if (isFavoritesLoading) {
    return <p>Cargando favoritos...</p>;
  }

  if (favoritesError) {
    return <p>Error al obtener los favoritos: {favoritesError}</p>;
  }
  return (
    <>
      {favorites === null || favorites.length === 0 ? (
        <p>No estás siguiendo ninguna película</p>
      ) : (
        favorites.map((favorite, index) => (
          <Link to={"/movie/" + favorite.id} key={index}>
            <Alert type={"warning"}>
                <img src={base_url + '/media/' + favorite.imageUrl} alt='movieImage' className='mx-4 w-12 h-15'/>
                <p className='flex items-center text-black font-mono pr-48 text-lg'>{favorite.title}</p>
                <div className='flex items-center'>
                    <button onClick={() => handleMovieDelete(index)} className='bg-red-500 hover:bg-red-700 text-white px-2 flex items-center scale-110 rounded-sm'><HiOutlineMinusSm></HiOutlineMinusSm>Eliminar</button>
                </div>
            </Alert>
          </Link>
          
        ))
      )}
    </>
  );
};

export default Favorites;