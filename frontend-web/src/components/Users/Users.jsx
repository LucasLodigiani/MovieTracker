import React, { useEffect, useState } from 'react'
import { base_url } from '../../utils/Config';
import Alert from '../Shared/Alert';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch( base_url + '/api/Users/GetAllUsers');
          if(response.status === 401 ){
            throw new Error("Unauthorized");
          }
          const jsonData = await response.json();
          setUsers(jsonData);
          console.log(jsonData)
        } catch (error) {
          console.error('Error fetching data:', error);
          setError("Error al obtener los datos: " + error);
        }
      };
  
      fetchData();
  }, []);

  const mappedUsers = users.map((u) => {
    return(
    <Alert key={u.id}>
        {u.role === "Admin" || u.role === "Mod" ? <p className='bg-red-600 text-white rounded px-2'>{u.role}</p> : <p className='bg-blue-400 text-white rounded px-2'>{u.role}</p>}
        <p className='text-black font-semibold'>{u.userName}</p>
        <p>{u.email}</p>
        <div className='ml-auto'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white px-2 rounded'>Editar</button>
            <button className='bg-red-500 hover:bg-red-700 text-white px-2 rounded'>Eliminar</button>
        </div>
        
    </Alert>);
})
  return (
    <>
        <p className='text-black font-semibold'>{error}</p>
        {users.length === 0 && error === '' ? <p className='bg-red'>Cargando...</p> : <span>{mappedUsers}</span> }
    </>
  )
}

export default Users