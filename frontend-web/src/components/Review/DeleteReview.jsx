import Modal from '../Shared/Modal'
import React from 'react'
import {BiSolidCommentX} from 'react-icons/bi'
import useDeleteReview from '../../hooks/reviews/useDeleteReview'
import ButtonLoading from '../Shared/ButtonLoading'
const DeleteReview = ({id}) => {

    const [review, isDeleteReviewLoading, DeleteReviewError, deleteReview ] = useDeleteReview(); 
    
    const handleDelete = async () => {
        await deleteReview(id);
    }
  return (
    <Modal icon={<BiSolidCommentX />} title="Eliminar"  buttonStyle={"bg-red-500 hover:bg-red-700 text-white px-2 rounded"}>
        <p>Esta seguro que desea eliminar esta reseña?</p>
        {review && <p>{review}</p>}
        {DeleteReviewError && <p>Ha ocurrido un error: {DeleteReviewError}</p>}
        <ButtonLoading isLoading={isDeleteReviewLoading} onClick={handleDelete} buttonText={"Eliminar"}></ButtonLoading>
    </Modal>
  )
}

export default DeleteReview