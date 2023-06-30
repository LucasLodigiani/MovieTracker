import React, { useEffect, useState } from 'react'
import Alert from '../Shared/Alert';
import Modal from '../Shared/Modal';
import DeleteUser from './DeleteUser';
import useGetUsers from '../../hooks/users/useGetUsers';
import UpdateUser from './UpdateUser';

const Users = () => {
  const [users, setUsers,isUsersLoading, usersError] = useGetUsers();
  const [userResult, setUserResult] = useState("");

  const handleDeleteCallback = (userDeletedId, result) => {
    //Desde el componente hijo DeleteUser obtenemos el usuario eliminado, luego para forzar la re-renderizacion volvemos a setear el state con los usuarios filtrados.
    const usersFiltered = users.filter((user) => user.id !== userDeletedId)
    setUsers(usersFiltered);
    setUserResult(result);
  }

  
  //Para simplificar y hacer que se lea mejor el return.
  function renderUsers(){
    return users.map((u) => {
      return(
      <Alert key={u.id}>
          {console.log(u)}
          {u.role === "Admin" || u.role === "Mod" ? <p className='bg-red-600 text-white rounded px-2'>{u.role}</p> : <p className='bg-blue-400 text-white rounded px-2'>{u.role}</p>}
          <p className='text-black font-semibold'>{u.userName}</p>
          <p>{u.email}</p>
          <div className='ml-auto inline-flex'>
              <UpdateUser user={u} ></UpdateUser>
              <DeleteUser user={u} DeleteCallback={handleDeleteCallback}></DeleteUser>
          </div>
          
      </Alert>);
    })
  }

  return (
    <>
        {isUsersLoading && <p>Cargando...</p>}
        {users !== null ? renderUsers() : null}
        {usersError && <p>Ha ocurrido un error: {usersError}</p>}
        {userResult && <p>{userResult}</p>}
    </>
  )
}

export default Users