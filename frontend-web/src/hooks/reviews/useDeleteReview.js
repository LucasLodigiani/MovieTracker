import  { useState } from 'react'
import { base_url } from '../../utils/Config';
const useDeleteReview = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteReview = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(base_url + "/api/Reviews/id?reviewId=" + id, {
                method: "DELETE",
            });
            if (response.status !== 204) {
                throw new Error("Ha ocurrido un problema al eliminar la reseña");
            }
            const dataResult = "Reseña eliminada correctamente!";

            setData(dataResult);
            setIsLoading(false);
            setError(null);
        }
        catch(error){
            setError(error.message)
            setIsLoading(false)
        }
    }
    return [data,isLoading,error,deleteReview]
}

export default useDeleteReview