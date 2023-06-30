import  { useState } from 'react'
import { base_url } from '../../utils/Config';
const useDeleteReview = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteReview = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(base_url + "/api/Reviews/id/" + id, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Ha ocurrido un problema al eliminar el comentario");
            }
            const dataResult = await response.text();

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