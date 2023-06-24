import React, { useState } from 'react';
import { base_url } from '../../utils/Config';

const useDeleteUser = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    setIsLoading(true);

    try {
      const response = await fetch(base_url + "/api/Users/DeleteUser?id=" + userId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        const dataResult = "Usuario eliminado con éxito!";
        setData(dataResult);
        setIsLoading(false);
        setError(null);
      } else {
        throw new Error("Ha ocurrido un problema al eliminar al usuario");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return [data, isLoading, error, deleteUser];
};

export default useDeleteUser;