import React, { useEffect, useState } from 'react'
import { base_url } from '../../utils/Config';
import Alert from '../Shared/Alert';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch( base_url + '/api/Users/GetAllUsers');
          const jsonData = await response.json();
          setUsers(jsonData);
          console.log(jsonData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
  }, []);
  return (
    <>
        <p className='text-black font-semibold'>Usuarios totales: {users.length}</p>
        {users.map((u) => {
            return(
            <Alert key={u.id}>
                {u.role === "Admin" || u.role === "Mod" ? <p className='bg-red-600 text-white rounded px-2'>{u.role}</p> : <p className='bg-blue-400 text-white px-2'>{u.role}</p>}
                <p className='text-black font-semibold'>{u.userName}</p>
                <p>{u.email}</p>
                
                
                <span>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white px-2 rounded'>Editar</button>
                    <button className='bg-red-500 hover:bg-red-700 text-white px-2 rounded'>Eliminar</button>
                </span>
                
            </Alert>)
        })}
    </>
  )
}

export default Users