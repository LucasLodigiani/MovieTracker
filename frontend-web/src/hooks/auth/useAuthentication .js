import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const useAuthentication = () => {
  const { user, setUser } = useContext(UserContext);

  const setUserData = (data) => {
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data))
    setUser(data);
  };

  const isAuthenticated = () => {
    console.log("Verificacion")
    if(user !== null){
      return true;
    }
    else{
      return false;
    }
  };

  const isInRole = (role) => {
    if(user.role === role){
      return true;
    }
    else{
      return false;
    }
  }

  const logout = () => {
    console.log("Ejecutado")
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    setUserData(null);
  }

  return [user, setUserData, isAuthenticated, isInRole, logout];
};

export default useAuthentication;