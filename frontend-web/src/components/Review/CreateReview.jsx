
import React, { useState } from 'react'
import ButtonLoading from '../Shared/ButtonLoading';
import { MdOutlineReviews } from 'react-icons/md'
import useAuthentication from '../../hooks/auth/useAuthentication ';
import { Link } from 'react-router-dom';
import useCreateReview from '../../hooks/reviews/useCreateReview';
const CreateReview = ({movieId}) => {
    const [title, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [rate, setRate] = useState(1);

    const [userData, setUserData, isAuthenticated, isInRole, logout ] = useAuthentication();

    const [createReviewResult, isReviewCreating, isReviewError, createReview] = useCreateReview();

    const headerHandler = (event) => {
        setHeader(event.target.value);
    }
    
    const contentHandler = (event) => {
        setContent(event.target.value);
    }

    const rateHandler = (event) => {
        setRate(event.target.value);
    }

    const handleReviewCreation = async (event) => {
        event.preventDefault();
        await createReview({movieId,title, content, rate})

    }

  return (
    <div className='w-1/2 mb-3 p-2 bg-gray-600 rounded-sm hover:bg-gray-700 ' style={{ boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.3)' }}>
        {isAuthenticated() === true ? 
        <>
            <div className='flex items-center'>
                <MdOutlineReviews size={20}></MdOutlineReviews>
                <p className='mb-1'>Nueva reseña</p>
            </div>
            <form>
                <p>Puntuación:</p>
                <input value={rate} onChange={rateHandler} type='number' className='w-1/2 text-black'></input>
                <p>Encabezado:</p>
                <input value={title} onChange={headerHandler} type='text' className='w-1/2 text-black'></input>
                <p>Reseña:</p>
                <textarea value={content} onChange={contentHandler} className=' w-10/12 text-black'></textarea>
                <br></br>
                <div className='text-right'>
                    <ButtonLoading isLoading={isReviewCreating} buttonText="Crear" onClick={handleReviewCreation}></ButtonLoading>
                </div>
                {createReviewResult && <p>Review creada con éxito!!</p>}
                {isReviewError && <p>Ha ocurrido un error: {isReviewError}</p>}
            </form></> : 
        <>
            <div className='text-center'>
                <p className=' mb-2'>Debes estar logueado para dejar unar reseña</p>
                <Link to="/login" className="rounded-sm bg-blue-600 hover:bg-blue-700 py-1 px-3 mx-1">
                    Iniciar Sesión
                </Link>
                <Link to="/register" className="rounded-sm bg-blue-600 hover:bg-blue-700 py-1 px-3 mx-1">
                    Registrarte
                </Link>
            </div>
        </>}
        
    </div>
  )
}

export default CreateReview