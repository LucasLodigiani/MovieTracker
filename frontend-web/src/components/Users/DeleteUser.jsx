import React, {useEffect} from 'react';
import Alert from '../Shared/Alert';
import Modal from '../Shared/Modal';
import { BiSolidUserMinus } from 'react-icons/bi';
import ButtonLoading from '../Shared/ButtonLoading';
import useDeleteUser from '../../hooks/users/useDeleteUser';

const DeleteUser = ({ user, DeleteCallback }) => {
  const [deleteUserResult, isDeleteUserLoading, isDeleteUserError, deleteUser] = useDeleteUser();

  useEffect(() => {
    if (isDeleteUserError === null && deleteUserResult !== null) {
      DeleteCallback(user.id, deleteUserResult);
    }
  }, [isDeleteUserError, deleteUserResult, DeleteCallback, user.id]);

  const handleDelete = async () => {
    await deleteUser(user.id);
  };

  return (
    <Modal icon={<BiSolidUserMinus size={25} color="#235b8d" />} title="Eliminar" buttonStyle="bg-red-500 hover:bg-red-700 text-white px-2 rounded">
      <p className='text-center'>¿Está seguro que desea eliminar a este usuario?</p>
      <Alert>
        {user.role === "Admin" || user.role === "Mod" ? <p className='bg-red-600 text-white rounded px-2'>{user.role}</p> : <p className='bg-blue-400 text-white rounded px-2'>{user.role}</p>}
        <p className='text-black font-semibold'>{user.userName}</p>
        <p>{user.email}</p>
      </Alert>
      {isDeleteUserError && <p>Ha ocurrido un error: {isDeleteUserError}</p>}
      <ButtonLoading buttonText="Eliminar" isLoading={isDeleteUserLoading} onClick={handleDelete}></ButtonLoading>
    </Modal>
  );
}

export default DeleteUser;