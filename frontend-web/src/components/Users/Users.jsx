import React, { useEffect, useState } from 'react'
import Alert from '../Shared/Alert';
import Modal from '../Shared/Modal';
import DeleteUser from './DeleteUser';
import useGetUsers from '../../hooks/users/useGetUsers';

const Users = () => {
  const [users, isUsersLoading, isUsersLoadingError] = useGetUsers();

  //Para simplificar y hacer que se lea mejor el return.
  function renderUsers(){
    return users.map((u) => {
      return(
      <Alert key={u.id}>
          {u.role === "Admin" || u.role === "Mod" ? <p className='bg-red-600 text-white rounded px-2'>{u.role}</p> : <p className='bg-blue-400 text-white rounded px-2'>{u.role}</p>}
          <p className='text-black font-semibold'>{u.userName}</p>
          <p>{u.email}</p>
          <div className='ml-auto inline-flex'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white px-2 rounded'>Editar</button>
              <DeleteUser user={u}></DeleteUser>
          </div>
          
      </Alert>);
    })
  }

  return (
    <>
        {isUsersLoading && <p>Cargando...</p>}
        {users !== null ? renderUsers() : null}
        {isUsersLoadingError && <p>Ha ocurrido un error: {isUsersLoadingError}</p>}
    </>
  )
}

export default Users