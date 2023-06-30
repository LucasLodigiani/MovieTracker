
import React, { useContext, useState } from 'react'
import { base_url } from '../../utils/Config';
import { UserContext } from '../../contexts/UserContext';
import jwtDecode from 'jwt-decode';
import useAuthentication from './useAuthentication ';

const useLogin = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [ user, setUserData, isAuthenticated ] = useAuthentication();


    const login = async (userData) => {
        //Loguear usuario
        setIsLoading(true);
        try{
            const response = await fetch(base_url + "/api/Users/Login", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });

            if(!response.ok){
                throw new Error("Ha ocurrido un problema al loguear al usuario");
            }
            
            const jwtToken = await response.text();
            const decodedToken = jwtDecode(jwtToken);
            localStorage.setItem('jwt', jwtToken);
            setUserData({ id: decodedToken.unique_id, name: decodedToken.unique_name, role: decodedToken.role });
            setData(jwtToken);
            setIsLoading(false);
            setError(null);
            
        }
        catch(error){
            setError(error.message);
            setIsLoading(false);
        }
    };
    return [data,isLoading,error,login] 
}

export default useLogin;