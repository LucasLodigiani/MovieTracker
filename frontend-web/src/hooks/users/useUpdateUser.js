
import React, {  useState } from 'react'
import { base_url } from '../../utils/Config';


const useUpdateUser = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const updateUser = async (userData) => {
        setIsLoading(true);
        try{
            const jwtToken = localStorage.getItem('jwt');
            if(jwtToken === null){
                throw new Error("El usuario no esta logueado");
            }
            const response = await fetch(base_url + "/api/Users", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}` // Aquí se agrega el token al encabezado
                  },
                body: JSON.stringify(userData),
              });

            if(!response.ok){
                throw new Error("Ha ocurrido un problema al modificar el usuario");
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
    return [data, isLoading, error, updateUser] 
}

export default useUpdateUser;