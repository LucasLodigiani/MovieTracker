
import React from 'react'
import Alert from '../Shared/Alert'

const DeleteUser = ({user}) => {
  return (
    <>
        <p className='text-center'>Esta seguro que desea eliminar a este usuario?</p>
        <Alert>
            
            {user.role === "Admin" || user.role === "Mod" ? <p className='bg-red-600 text-white rounded px-2'>{user.role}</p> : <p className='bg-blue-400 text-white rounded px-2'>{user.role}</p>}
            <p className='text-black font-semibold'>{user.userName}</p>
            <p>{user.email}</p>
        </Alert>
        <button className='bg-red-500 hover:bg-red-700 text-white px-2 rounded' onClick={() => console.log("Nothing..")}>Eliminar</button>
    </>
    

  )
}

export default DeleteUser