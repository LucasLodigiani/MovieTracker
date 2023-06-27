
import React, {  useState } from 'react'
import { base_url } from '../../utils/Config';


const useCreateReview = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const createReview = async (reviewData) => {
        setIsLoading(true);
        try{
            const jwtToken = localStorage.getItem('jwt');
            if(jwtToken === null){
                throw new Error("El usuario no esta logueado");
            }
            const response = await fetch(base_url + "/api/Reviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}` // Aquí se agrega el token al encabezado
                  },
                body: JSON.stringify(reviewData),
              });

            if(!response.ok){
                throw new Error("Ha ocurrido un problema al crear la review");
            }
            
            const dataResult = await response.json();
            setData(dataResult);
            setIsLoading(false);
            setError(null);
        }
        catch(error){
            setError(error.message);
            setIsLoading(false);
        }
    };
    return [data, isLoading, error, createReview] 
}

export default useCreateReview;