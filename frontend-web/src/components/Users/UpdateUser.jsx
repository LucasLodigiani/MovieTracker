import React, { useEffect, useState } from 'react';
import Alert from '../Shared/Alert';
import Modal from '../Shared/Modal';
import { BiSolidUserMinus } from 'react-icons/bi';
import ButtonLoading from '../Shared/ButtonLoading';
import useDeleteUser from '../../hooks/users/useDeleteUser';
import useUpdateUser from '../../hooks/users/useUpdateUser';

const UpdateUser = ({ user }) => {
  const [updateUserResult, isUserLoading, UserError, updateUser] = useUpdateUser();

  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleRole = (event) => {
    setRole(event.target.value);
  }



  const handleUpdate = async () => {
    const { id } = user;
    await updateUser({ id, userName, email, role });
  };

  return (
    <Modal icon={<BiSolidUserMinus size={25} color="#235b8d" />} title="Editar" buttonStyle="bg-blue-500 hover:bg-red-700 text-white px-2 rounded">
      <p>Username</p>
      <input type='text' value={userName} onChange={handleUsername} placeholder={user.userName}></input>
      <p>Email</p>
      <input type='text' value={email} onChange={handleEmail} placeholder={user.email}></input>
      <p>Rol</p>
      <input type='text' value={role} onChange={handleRole} placeholder={user.role}></input>
      {updateUserResult && <p>Usuario modificado exitosamente!</p>}
      {UserError && <p>Ha ocurrido un error: {UserError}</p>}
      <ButtonLoading buttonText="Eliminar" isLoading={isUserLoading} onClick={handleUpdate}></ButtonLoading>
    </Modal>
  );
}

export default UpdateUser;