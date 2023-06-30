
import React, { useState,useContext } from 'react'
import ButtonLoading from '../Shared/ButtonLoading';
import { MdOutlineReviews } from 'react-icons/md'
import useAuthentication from '../../hooks/auth/useAuthentication ';
import { Link } from 'react-router-dom';
import useCreateReview from '../../hooks/reviews/useCreateReview';
import {ThemeContext} from '../../contexts/ThemeContext'
const CreateReview = ({ movieId }) => {
    const [title, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [rate, setRate] = useState(1);
  
    const [userData, setUserData, isAuthenticated, isInRole, logout] =
      useAuthentication();
  
    const [createReviewResult, isReviewCreating, isReviewError, createReview] =
      useCreateReview();
  
    const headerHandler = (event) => {
      setHeader(event.target.value);
    };
  
    const contentHandler = (event) => {
      setContent(event.target.value);
    };
  
    const rateHandler = (event) => {
      setRate(event.target.value);
    };
  
    const handleReviewCreation = async (event) => {
      event.preventDefault();
      await createReview({ movieId, title, content, rate });
    };
  
    const { theme } = useContext(ThemeContext);
  
    return (
      <div
        className={`w-1/2 mb-3 p-2 ${
          theme === 'dark' ? 'bg-gray-500' : 'bg-gray-200'
        } - rounded-xl`}
        style={{ boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)' }}
      >
        {isAuthenticated() === true ? (
          <>
            <div className='flex items-center'>
              <MdOutlineReviews size={20} />
              <p className='mb-1'>Nueva reseña</p>
            </div>
            <form>
              <p className='mx-48'>Puntuación</p>
              <input
                value={rate}
                onChange={rateHandler}
                type='number'
                className='mx-12 w-10/12 text-black rounded-full placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 py-2 pl-9 pr-3 focus:outline-none focus:border-rose-950 focus:ring-rose-500 focus:ring-1 sm:text-sm'
                min={1}
                max={5}
              />
              <p className='mx-48'>Encabezado</p>
              <input
                value={title}
                onChange={headerHandler}
                type='text'
                className=' mx-12 w-10/12 text-black rounded-full placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 py-2 pl-9 pr-3  focus:outline-none focus:border-rose-950 focus:ring-rose-500 focus:ring-1 sm:text-sm'
              />
              <p className='mx-48'>Reseña</p>
              <textarea
                value={content}
                onChange={contentHandler}
                className='mx-12 w-10/12 text-black placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 py-2 pl-9 pr-3 focus:outline-none focus:border-rose-950 focus:ring-rose-500 focus:ring-1 sm:text-sm rounded-2xl resize-none h-32'
              ></textarea>
              <br />
              <div className='text-center'>
                <ButtonLoading
                  isLoading={isReviewCreating}
                  buttonText='Crear'
                  onClick={handleReviewCreation}
                  className='rounded-2xl'
                />
              </div>
              {createReviewResult && <p>Review creada con éxito!!</p>}
              {isReviewError && <p>Ha ocurrido un error: {isReviewError}</p>}
            </form>
          </>
        ) : (
          <>
            <div className='text-center'>
              <p className=' mb-2'>Debes estar logueado para dejar una reseña</p>
              <Link
                to='/login'
                className='rounded-sm bg-blue-600 hover:bg-blue-700 py-1 px-3 mx-1'
              >
                Iniciar Sesión
              </Link>
              <Link
                to='/register'
                className='rounded-sm bg-blue-600 hover:bg-blue-700 py-1 px-3 mx-1'
              >
                Registrarte
              </Link>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default CreateReview;